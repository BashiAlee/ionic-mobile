import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyFeedsPage } from './my-feeds';

@NgModule({
  declarations: [
    MyFeedsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyFeedsPage),
  ],
})
export class MyFeedsPageModule {}
