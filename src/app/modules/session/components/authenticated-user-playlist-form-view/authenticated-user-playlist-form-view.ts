import {Component, OnDestroy, OnInit} from '@angular/core';
import {IPlaylist} from '../../../api/playlists/playlist.interface';
import {AuthenticatedUserPlaylistCloudplayerModel} from '../../../api/authenticated-user/playlist/authenticated-user-playlist-cloudplayer.model';
import {AuthenticatedUserPlaylistSoundcloudModel} from '../../../api/authenticated-user/playlist/authenticated-user-playlist-soundcloud.model';
import {AuthenticatedUserPlaylistYoutubeModel} from '../../../api/authenticated-user/playlist/authenticated-user-playlist-youtube.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';
import {IAccount} from '../../../api/account/account.interface';

@Component({
  selector: 'app-authenticated-user-playlist-form-view',
  styleUrls: ['./authenticated-user-playlist-form-view.scss'],
  templateUrl: './authenticated-user-playlist-form-view.html'
})
export class AuthenticatedUserPlaylistFormViewComponent implements OnInit, OnDestroy {
  private account: IAccount;
  public playlist: IPlaylist;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location) {
  }

  private setPlaylist(provider: string, playlistId?: string) {
    switch (provider) {
      case 'cloudplayer':
        this.playlist = new AuthenticatedUserPlaylistCloudplayerModel();
        break;
      case 'soundcloud':
        this.playlist = new AuthenticatedUserPlaylistSoundcloudModel();
        break;
      case 'youtube':
        this.playlist = new AuthenticatedUserPlaylistYoutubeModel();
        break;
    }

    if (playlistId) {
      if (this.account.playlists.get(playlistId)) {
        this.playlist = <IPlaylist>this.account.playlists.get(playlistId);
      } else {
        this.playlist.set('id', playlistId);
        this.playlist.fetch();
      }
    }
  }

  save() {
    this.playlist.save().then(() => {
      this.router.navigate(['/playlists', this.playlist.provider, this.playlist.id]);
      this.account.playlists.add(this.playlist);
    });
  }

  cancel() {
    this.location.back();
  }

  ngOnInit(): void {
    this.route.params.forEach((params: any) => {
      this.account = AuthenticatedUserModel.getInstance().accounts.getAccountForProvider(params.provider);
      this.setPlaylist(params.provider, params.id);
    });
  }

  ngOnDestroy() {

  }
}
