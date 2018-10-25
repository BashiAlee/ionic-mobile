import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signupForm: FormGroup;
  constructor(public navCtrl: NavController,
    public authService: AuthenticationProvider,
     public navParams: NavParams,
     public formBuilder: FormBuilder
    ) {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      confirmpassword: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(100)]]
    })
  }
  
  get form() {
    return this.signupForm.controls}
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  openLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  saveProfile() {
    console.log("FFF", this.signupForm.valid)
    // this.authService.signup(this.signupForm.value)
    // .subscribe( data=> {
    //   console.log("DDD")
    // });
  }



}
