import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { EditUserPage } from '../user/edit-user/edit-user';
import { AlertController } from 'ionic-angular';
import { LoadingController,ModalController, Platform } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthenticationProvider]
})
export class LoginPage {

  loginForm: FormGroup;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public auth: AuthenticationProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {
      this.loginForm = this.formBuilder.group({
        Email: [''],
        Password: ['']
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }
  get form() {return this.loginForm.controls}
  openSignupPage() {
    this.navCtrl.push(SignupPage);
  }
  go() {
    this.navCtrl.push(SignupPage);
  }
  // openModal(characterNum) {
  //   let modal = this.modalCtrl.create(ModalContentPage, characterNum);
  //   modal.present();
  // }
  login() {
    let loader =  this.loadingCtrl.create({
      content: 'Please wait...',
    });
    loader.present();
    this.auth.login(this.loginForm.value)
    .subscribe(
      data =>{
        if(data.status) {
          this.navCtrl.setRoot(EditUserPage)
          loader.dismiss();
        } else if(!data.status){
          loader.dismiss();
          this.showErrorAlert(data.message)
        }
      }
    );
    // this.navCtrl.setRoot(EditUserPage)
  }

  showErrorAlert(message) {
    const alert = this.alertCtrl.create({
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewCanEnter(){

    if(this.auth.isLoggedIn()) {
      this.navCtrl.setRoot(EditUserPage)
    }
   }


}
