import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyFollowersPage } from './my-followers';

@NgModule({
  declarations: [
    MyFollowersPage,
  ],
  imports: [
    IonicPageModule.forChild(MyFollowersPage),
  ],
})
export class MyFollowersPageModule {}
