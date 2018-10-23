import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewerProfilePage } from './viewer-profile';

@NgModule({
  declarations: [
    ViewerProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewerProfilePage),
  ],
})
export class ViewerProfilePageModule {}
