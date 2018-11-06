import { Component } from '@angular/core';
import { ViewController, NavController, App } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { LoginPage } from '../../pages/login/login';
import { UserProfilePage } from '../../pages/user-profile/user-profile';



@Component({
  selector: 'user-popover',
  templateUrl: 'user-popover.html',
  providers: [AuthenticationProvider]
})
export class UserPopoverComponent {
  user: any;
  constructor(
    public viewCtrl: ViewController,
    public authService: AuthenticationProvider,
    public navCtrl: NavController,
    public appCtrl: App
  ) {
    this.user = this.authService.getCurrentUser();
    console.log(this.user)
  }

  close() {
    this.viewCtrl.dismiss();
  }
  logout() {
    localStorage.clear();
    this.appCtrl.getRootNav().setRoot(LoginPage)
  }

  openUserProfile() {
    this.appCtrl.getRootNav().setRoot(UserProfilePage,{id: this.user._id})
    // this.viewCtrl.dismiss();
  }

}
