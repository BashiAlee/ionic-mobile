import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';



@NgModule({
  declarations: [

  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  providers:[
  ],
  exports: [

  ]
})
export class LoginPageModule {}
