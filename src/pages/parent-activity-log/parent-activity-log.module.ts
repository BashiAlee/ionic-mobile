import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParentActivityLogPage } from './parent-activity-log';

@NgModule({
  declarations: [
    ParentActivityLogPage,
  ],
  imports: [
    IonicPageModule.forChild(ParentActivityLogPage),
  ],
})
export class ParentActivityLogPageModule {}
