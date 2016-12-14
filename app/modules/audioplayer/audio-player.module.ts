import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {BrowserModule} from '@angular/platform-browser';
import {AudioPlayerComponent} from './components/index/index.component';
import {PlayQueueComponent} from './components/playqueue/playqueue.component';
import {PlayerControlsComponent} from './components/controls/controls.component';
import {PlayButtonComponent} from './components/play-button/play_button.component';
import {PlayListComponent} from './components/playlist/playlist.component';

@NgModule ({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AudioPlayerComponent,
    PlayQueueComponent,
    PlayerControlsComponent,
    PlayButtonComponent,
    PlayListComponent
  ],
  exports: [
    AudioPlayerComponent,
    PlayButtonComponent,
    PlayListComponent
  ]
})

export class AudioPlayerModule { }
