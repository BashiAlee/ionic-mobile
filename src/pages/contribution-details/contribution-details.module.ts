import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContributionDetailsPage } from './contribution-details';

@NgModule({
  declarations: [
    ContributionDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ContributionDetailsPage),
  ],
  exports: [
    ContributionDetailsPage
  ]
})
export class ContributionDetailsPageModule {}
