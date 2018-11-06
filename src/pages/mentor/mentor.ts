import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the MentorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mentor',
  templateUrl: 'mentor.html',
  providers: [AuthenticationProvider, UserProvider]
})
export class MentorPage {
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
    this.getFollowerList(this.user._id)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MentorPage');
  }

  getFollowerList(id) {
    this.followersList = [];
    this.loader = true;
    this.userService.getFollower(id)
      .subscribe(
        data => {
          if (data.status) {
            this.followersIds = data.data;
            this.followersIds.Follower.forEach(followers => {
              if (followers.ParentStatus) {
                this.viewProfileByID(followers.Userfollowerid);
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

  unFollowMentor(id) {

    var data = {

      userid: this.user._id,
      follower: [{
        followersid: id
      }]

    }
    this.userService.unfollowMentor(data)
      .subscribe(
        data => {
          this.getFollowerList(this.user._id)
        },
        error => {});
  }

}
