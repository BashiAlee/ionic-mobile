import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { UserProvider } from '../../../providers/user/user';
import { ToastController } from 'ionic-angular';
import { UserProfilePage } from '../../user-profile/user-profile';
/**
 * Generated class for the AboutMePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about-me',
  templateUrl: 'about-me.html',
})
export class AboutMePage {
  aboutMeForm: FormGroup
  user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthenticationProvider,
  private formBuilder: FormBuilder,
  private userService: UserProvider,
  private toastCtrl: ToastController
) {
    if(this.authService.isLoggedIn) {
      this.user = this.authService.getCurrentUser();
    }
    this.aboutMeForm = this.formBuilder.group({
      _id: new FormControl(this.user._id),
      AboutMe: new FormControl(this.user.AboutMe),
      CompanyName: new FormControl(this.user.CompanyName),
      FullName: new FormControl(this.user.CompanyName),
      Email: new FormControl(this.user.Email),
      // Password: new FormControl(this.user.Password,Validators.required),
      Address: new FormControl(this.user.Address),
      City: new FormControl(this.user.City),
      ZipCode: new FormControl(this.user.ZipCode),
      Bio: new FormControl(this.user.Bio),
      Age: new FormControl(this.user.Age),
      Status: new FormControl(this.user.Status),
      ParentStatus: new FormControl(this.user.ParentStatus),
      ProfilePicture: new FormControl(this.user.ProfilePicture),
      ParentEmail: new FormControl(this.user.ParentEmail),
      ParentPhone: new FormControl(this.user.ParentPhone)

  })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutMePage');
  }

  updateAboutMe() {
    console.log("called")
    this.userService.updateAboutMe(this.aboutMeForm.value)
    .subscribe(
      data => {

        if(data.status) {
          localStorage.setItem('user', JSON.stringify(data.data))
          let toast = this.toastCtrl.create({
            message: 'About Me Updated successfully',
            duration: 3000,
            position: 'bottom'
          });
        
          toast.present();

          this.navCtrl.setRoot(UserProfilePage,{id: this.user._id} )
         
        } else if(!data.status){
          let toast = this.toastCtrl.create({
            message: 'About Me not updated',
            duration: 3000,
            position: 'bottom'
          });
        
          toast.present();
        }
      }
    )
  }

}
