import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { CreateContributionPage } from '../../pages/create-contribution/create-contribution';

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: './user-profile.html',
  providers: [UserProvider, AuthenticationProvider]
})
export class UserProfilePage {
  id: any;
  userData: any;
  loading: any;
  user: any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public userService: UserProvider,
     public domSanitizer: DomSanitizer,
     public authService: AuthenticationProvider
    ) {
      this.user = this.authService.getCurrentUser();
      this.id = this.navParams.get('id')
      console.log("DDDD", this.id)
  }

  ionViewDidLoad() {
    this.viewProfileByID(this.id)
  }
  goTo() {
    this.navCtrl.setRoot(CreateContributionPage);
  }
  viewProfileByID(id) {
    this.loading = true;
    this.userService.viewProfileById(id)
    .subscribe( data => {
      if(data.status) {
        this.userData = data.data;
        this.getFollowersCountById(this.user._id);
        this.getUserContributionByEmail(this.user.Email);
        this.getDueContributions(this.user._id)
        this.loading = false;
      } else if (!data.status) {
        this.userData = null;
        this.loading = false;
      }
    })
  }

  getFollowersCountById(id) {
    this.userService.getUserFollowerCountById(id)
    .subscribe( data=> {
    })
  }

  getUserContributionByEmail(email) {
    this.userService.getUserConstributionsbyEmail(email)
    .subscribe( data=> {
    })
  }
  getDueContributions(id) {
    this.userService.getDueContributions(id)
    .subscribe( data=> {
    })
  }

}
