import { Component } from '@angular/core';
import { ViewController, NavController, App } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { LoginPage } from '../../pages/login/login';
import { UserProfilePage } from '../../pages/user-profile/user-profile';
import { ParentActivityLogPage } from '../../pages/parent-activity-log/parent-activity-log';
import { ParentProfilePage } from '../../pages/parent-profile/parent-profile';
import { EditUserPage } from '../../pages/user/edit-user/edit-user';
import { PreferencesPage } from '../../pages/preferences/preferences';



@Component({
  selector: 'user-popover',
  templateUrl: 'user-popover.html',
  providers: [AuthenticationProvider]
})
export class UserPopoverComponent {
  user: any;
  pages: any;
  constructor(
    public viewCtrl: ViewController,
    public authService: AuthenticationProvider,
    public navCtrl: NavController,
    public appCtrl: App
  ) {
    this.user = this.authService.getCurrentUser();
    this.pages = [
      { title: 'Edit / Profile Settings', component: EditUserPage },
      { title: 'Set Preferences', component: PreferencesPage },
      { title: 'Parent Profile', component: ParentProfilePage },
      { title: 'Parent Activity log', component: ParentActivityLogPage }
    ];
  }
  

  close() {
    this.viewCtrl.dismiss();
  }
  logout() {
    localStorage.clear();
    this.appCtrl.getRootNav().setRoot(LoginPage)
    this.close()
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.appCtrl.getRootNav().setRoot(page.component);
    this.close()
  }

  openUserProfile() {
    this.appCtrl.getRootNav().setRoot(UserProfilePage,{id: this.user._id})
    this.close()
  }
  

}
