import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyContributionPage } from './my-contribution';
import { ContributionsProvider } from '../../providers/contributions/contributions';
import { PopoverContributionComponent } from '../../components/popover-contribution/popover-contribution';

@NgModule({
  declarations: [
    // MyContributionPage,
    // PopoverContributionComponent
  ],
  imports: [
    IonicPageModule.forChild(MyContributionPage),
  ],
  // providers: [
  //   ContributionsProvider
  // ],
  // exports: [
  //   MyContributionPage
  // ]
})
export class MyContributionPageModule {}
