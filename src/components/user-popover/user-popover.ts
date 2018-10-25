import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { LoginPage } from '../../pages/login/login';


@Component({
  selector: 'user-popover',
  templateUrl: 'user-popover.html',
})
export class UserPopoverComponent {
  user: any;
  constructor(
    public viewCtrl: ViewController,
    public authService: AuthenticationProvider,
    public navCtrl: NavController
  ) {
    this.user = this.authService.getCurrentUser();
    // this.getContributionByEmail(data);
 console.log(this.user)
  }

  close() {
    this.viewCtrl.dismiss();
  }
  logout() {
    localStorage.clear();
    this.navCtrl.setRoot(LoginPage)
  }

}
