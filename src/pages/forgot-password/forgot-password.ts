import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from'../login/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController,ModalController, Platform } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
  providers: [AuthenticationProvider]

})
export class ForgotPasswordPage {
  forgotForm: FormGroup;
  message:any;
  res:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public auth: AuthenticationProvider,
    public loadingCtrl: LoadingController
  ) {
    this.forgotForm = this.formBuilder.group({
      email: ['']
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }
  forgotPassword(){
    let loader =  this.loadingCtrl.create({
      content: 'Please wait...',
    });
    loader.present();
    this.auth.resetPassword(this.forgotForm.value)
    .subscribe(
      data =>{
        if(data.status) {
          loader.dismiss();
          this.res=true
          this.message=data.message
        } else if(!data.status){
          loader.dismiss();
          this.res=false
          this.message=data.message
        }
      }
    );
  }
  back(){
    this.navCtrl.setRoot(LoginPage)
  }
}
