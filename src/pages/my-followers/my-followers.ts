import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { UserProvider } from '../../providers/user/user';
import { ViewerProfilePage } from '../viewer-profile/viewer-profile';
/**
 * Generated class for the MyFollowersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-followers',
  templateUrl: 'my-followers.html',
})
export class MyFollowersPage {

  user: any;
  loader: any;
  followersIds: any = [];
  followersList: any = [];
  followersData: any=[];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthenticationProvider,
    public toastCtrl: ToastController,
    public userService: UserProvider
  ) {
    this.user = this.authService.getCurrentUser();
    this.getFollowerList(this.user._id);
    // this.getAllFollower(this.user._id)
  }

  ionViewDidLoad() {
  }
  openUserProfile(UserID) {
    this.navCtrl.setRoot(ViewerProfilePage, {userid: UserID})
  }
  getAllFollower(id) : Promise < any[] >{
   return new Promise((resolve, reject)=>{
      this.userService.getFollower(id)
      .subscribe(
        data => {
          if(data.status){
            return resolve(this.followersData.concat(data.data.Follower))
          } else {
            return reject(this.followersData = [])
          }
        },
        error => {});
    });
  }

  getFollowerList(id) {
    this.loader = true;
    this.userService.getUserFollower(id)
      .subscribe(
        followers => {
          if (followers) {
            followers.forEach(element => {
              this.getAllFollower(this.user._id)
              .then((value)=> {
               this.viewProfileByID(element.userid, element);
                 value.forEach(allFollowers => {
                if (element.userid === allFollowers.Userfollowerid) {
                     element.hasFollowing = true;
                   }
                   if((element.userid === allFollowers.Userfollowerid) && allFollowers.MessageStatus) {
                     element.canSendMessage = true;
                   }
                   if((element.userid === allFollowers.Userfollowerid) &&allFollowers.ParentStatus) {
                     element.isAllowed = true;
                   }
                 });
              })
            this.followersList.push(element)
            console.log(this.followersList);
            
            });
            this.loader = false;
          } else {
            this.loader = false;
            this.followersList = [];
          }
        },
        error => {});
  }

  viewProfileByID(id,value) {
    this.userService.viewProfileById(id)
    .subscribe( data => {
      if(data.status) {
        value.Bio = data.data.Bio;
        value.FullName = data.data.FullName;
        value.ProfilePicture = data.data.ProfilePicture;
      }
    })
  }

  addMentor(id,age,followers) {
    var data = {
      userid: this.user._id,
      follower: [{
        followersid: id
      }],
      userage: age
    }
    this.userService.addmentor(data)
      .subscribe(
        data => {
          if (data.status){
            if(age < 18) {
              let toast = this.toastCtrl.create({
                message: 'Your Request for approval has been sent to your parent',
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
            }
            else{
              followers.hasFollowing=true
              followers.isAllowed=true
            }
          }
        },
        error => {});
  }

  unFollowMentor(id,followers) {
    console.log(followers)
    var data = {
      userid: this.user._id,
      follower: [{
        followersid: id
      }]
    }
    this.userService.unfollowMentor(data)
    .subscribe(
      data => {
        if (data.status){
          followers.hasFollowing=false
          followers.isAllowed=true
        }
      },
      error => {});
  }

}
