import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  user: any;
  loader: any;
  followersIds: any = [];
  followersList: any = [];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthenticationProvider,
    public userService: UserProvider
  ) {
    this.user = this.authService.getCurrentUser();
  }

  ionViewDidLoad() {
    this.getFollowerList(this.user._id)
  }
  getFollowerList(id) {
    this.followersList = [];
    this.loader = true;
    this.userService.getFollower(id)
      .subscribe(
        data => {
      if (data.status) {
          this.followersIds = data.data;
          this.followersIds.Follower.forEach(followersList => {
          console.log("this is data",followersList)
          if (followersList.ParentStatus) {
                this.viewProfileByID(followersList.Userfollowerid);
              } else {
                this.loader = false;
              }
            });
          }
          // this.loading = false;
        },
        error => {});
  }

  viewProfileByID(id) {
    this.userService.viewProfileById(id)
    .subscribe( data => {
      if(data.status) {
        this.followersList.push(data.data);
        this.loader = false;
      }
    })
  }
}
