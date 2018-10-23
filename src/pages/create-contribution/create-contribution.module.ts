import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateContributionPage } from './create-contribution';

@NgModule({
  declarations: [
    CreateContributionPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateContributionPage),
  ],

  exports: [
    CreateContributionPage
  ]
  
})
export class CreateContributionPageModule {}
