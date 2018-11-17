import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { ContributionsProvider } from '../../providers/contributions/contributions';

/**
 * Generated class for the ViewerProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewer-profile',
  templateUrl: './viewer-profile.html',
})
export class ViewerProfilePage {
  id: any;
  userData: any;
  loading: any;
  user: any;
  contributionsList: any = [];


  totalFollowers: any = 0;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public userService: UserProvider,
     public domSanitizer: DomSanitizer,
     public authService: AuthenticationProvider,
     public contributionService: ContributionsProvider
    ) {
      this.user = this.authService.getCurrentUser();
      this.id = this.navParams.get('userid')
      console.log("DDDD", this.id)
  }

  ionViewDidLoad() {
    this.viewProfileByID(this.id)
  }
 
  viewProfileByID(id) {
    this.loading = true;
    this.userService.viewProfileById(id)
    .subscribe( data => {
      if(data.status) {
        this.userData = data.data;
        this.getFollowersCountById(this.userData._id);
        this.getUserContributionByEmail(this.userData.Email);

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
      if(data.status) {
        this.totalFollowers = data.data.Follower;
      }
      else if(!data.status) {
        this.totalFollowers = 0;
      }
    })
  }

  getUserContributionByEmail(email) {
    this.userService.getUserConstributionsbyEmail(email)
    .subscribe( data=> {
      if(data.status) {
        data.data.forEach(value => {
          this.getProfileByID(value.UserID, value)
          if(value.AdminStatus && value.ContributionStatus == "Publish") {
           
            this.getLikesAndComments(value._id,value);
            this.contributionsList.push(value);
          } 

        });
      } else {
        this.contributionsList = [];
        this.loading = false;
      }
    })
  }

  getLikesAndComments(id,value) {
    this.contributionService.getLikesAndComments(id)
    .subscribe(data => {
        if(!data.status) {
          value.social = {
            Likes: [],
            Comments: []
          }
        } else if(data.status) {
          value.social = data.data;
        }
  
        if(value.social.Likes && value.social.Likes.length) {
          value.social.Likes.forEach(id => {
            if(this.user._id === id.LikeUserID) {
              value.isLiked = true;
              return;
            } else {
              value.isLiked = false;
            }
          });
        } else {
          value.isLiked = false;
        }
    })
    this.loading = false;
  }

  getProfileByID(id, value) {
    this.userService.viewProfileById(id)
    .subscribe( data => {
      if(data.status) {
        value.bio = data.data.Bio
      } else if (!data.status) {
        value.bio = '-'
       
      }
    })
  
  }
  addLike(value,id) {
    var data = {
      contributionid: id,
      likes: [{
        likeuserid: this.user._id
      }]
    }
  
    this.contributionService.addLike(data)
      .subscribe(res => {
        if(res.status) {
          value.isLiked = true;
            value.Likes = res.data;
        }
  
      })
  }
  unLike(value,id) {
    var data = {
      contributionid: id,
      likes: [{
        likeuserid: this.user._id
      }]
    }
  
    this.contributionService.unLike(data)
      .subscribe(res => {
        if(res.status) {  
            value.isLiked = false;
            value.Likes = res.data;
        }
      })
  }

}
