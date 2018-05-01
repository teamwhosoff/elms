import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationsPage } from './notifications';
import { PipesModule } from '../../pipes/pipes.module';
import { TimeAgoPipe } from "time-ago-pipe";

@NgModule({
  declarations: [
    NotificationsPage,
    TimeAgoPipe
  ],
  imports: [
    IonicPageModule.forChild(NotificationsPage),
    PipesModule
  ],
  exports:[
  ]
})
export class NotificationsPageModule {
  constructor() {} 

}
