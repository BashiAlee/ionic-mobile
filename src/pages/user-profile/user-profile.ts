import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { DomSanitizer } from '@angular/platform-browser';

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
  providers: [UserProvider]
})
export class UserProfilePage {
  id: any;
  userData: any;
  loading: any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public userService: UserProvider,
     public domSanitizer: DomSanitizer
    ) {
      this.id = this.navParams.get('id')
      console.log("DDDD", this.id)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');

    this.viewProfileByID(this.id)
  }

  viewProfileByID(id) {
    this.loading = true;
    this.userService.viewProfileById(id)
    .subscribe( data => {
      if(data.status) {
        this.userData = data.data;
        this.loading = false;
      } else if (!data.status) {
        this.userData = null;
        this.loading = false;
      }
    })
  }

}
