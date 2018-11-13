import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
// import { AlertController } from 'ionic-angular';
import { LoadingController ,ToastController,AlertController } from 'ionic-angular';
// import { ToastController } from 'ionic-angular';
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
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController
    ) {
  }
  
  get form() {
    return this.signupForm.controls}
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      confirmpassword: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(100)]]
    })
  }
  openLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  signup() {
    delete this.signupForm.value.confirmpassword;
    let loader =  this.loadingCtrl.create({
      content: 'Please wait...',
    });
    loader.present();
        loader.dismiss();

    this.presentToast("this is toast")
    // this.authService.signup(this.signupForm.value)
    // .subscribe( data=> {
    //   if(data.status) {
    //     loader.dismiss();
    //     this.presentToast(data.message)
    //     this.navCtrl.setRoot(LoginPage)
    //   } else if(!data.status){
    //     loader.dismiss();
    //     this.showErrorAlert(data.message)
    //   }
    // });
  }
  showErrorAlert(message) {
    const alert = this.alertCtrl.create({
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  // toast for user successful creation
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message+" Please verify your email to login",
      duration: 5000,
      position: 'top',
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }


}
