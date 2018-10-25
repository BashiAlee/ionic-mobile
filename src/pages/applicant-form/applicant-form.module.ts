import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplicantFormPage } from './applicant-form';

@NgModule({
  declarations: [
    ApplicantFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplicantFormPage),
  ],
})
export class ApplicantFormPageModule {}
