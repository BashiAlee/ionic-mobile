import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { UserProvider } from '../../providers/user/user';
import { ContributionsProvider } from '../../providers/contributions/contributions';
import { ContributionDetailsPage } from '../../pages/contribution-details/contribution-details';

/**
 * Generated class for the MyFeedsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-feeds',
  templateUrl: 'my-feeds.html',
  providers: [AuthenticationProvider, UserProvider,ContributionsProvider]
})
export class MyFeedsPage {
  user: any;
  userPreferences: any = [];
  suggestedContribution: any = [];
  followersList: any = [];
  followersIds: any = [];
  userContributions: any = [];
  loaders: any = {};

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public authService: AuthenticationProvider,
     public userService: UserProvider,
     public contributionService: ContributionsProvider
    
    ) {
  }

  ionViewDidLoad() {
    this.user = this.authService.getCurrentUser();
    this.getFollowerList(this.user._id);
    this.getUserPreferences(this.user._id)
  }

  getUserPreferences(id) {
    this.loaders.suggestionLoader = true;
    let data = {userid: id}

    this.userService.getUserPreferences(data)
    .subscribe( data => {
      if(data.status) {
        this.userPreferences = data.data;
        if(data || this.userPreferences) {
          this.getSuggestions(this.userPreferences)
        }
      } else {
        this.suggestedContribution = [];
        // this.loaders.suggestionLoader = false;
      }
    })
  }

  getSuggestions(data) {
    this.userService.getSuggestedPreferences(data)
    .subscribe(data => {
      if(data.status) {
        data.data.forEach(value => {
          if(value.AdminStatus) {
            this.getLikesAndComments(value._id,value);
            this.suggestedContribution.push(value);
            this.loaders.suggestionLoader = false;
          } 
        });
      } else {
        this.suggestedContribution = [];
        this.loaders.suggestionLoader = false;
      }
    })  
  }

  getLikesAndComments(id,value) {
    this.contributionService.getLikesAndComments(id)
    .subscribe(data => {
        if(!data.status) {
          value.social = { Likes: [], Comments: [] }
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
  }

  getFollowerList(id) {
    this.loaders.feedLoader = true;
    this.userService.getFollower(id)
      .subscribe(
        data => {
          if (data.status) {
            this.followersIds = data.data;
            this.followersIds.Follower.forEach(followers => {
              if (followers.ParentStatus) {
                this.viewProfileByID(followers.Userfollowerid);
              }
            });
          } else if(!data.status){
            this.loaders.feedLoader = false;
            return;
          }

          this.loaders.feedLoader = false;
        },
        error => {});
  }

  viewProfileByID(id) {
    this.userService.viewProfileById(id)
    .subscribe( data => {
      if(data.status) {
        this.getContributionByEmail(data.data.Email)
      }
    })
  }
  getContributionByEmail(email) {
    var list = [];
    this.contributionService.getUserConstributionsbyEmail(email)
    .subscribe(
      data => {
        if(data.status) {
          data.data.forEach((value,index) => {
            if(value.AdminStatus && value.ContributionStatus == 'Publish') {
              this.getLikesAndComments(value._id,value);
              // list.push(value)
             
            } else {
              data.data.splice(index,1);
            }
          });
        } else {
          this.loaders.feedLoader = false;
          // this.userContributions = [];
        }

        // console.log("DDD", data.data)
          if(data.data) {
            this.userContributions.push(data.data);
          }
          console.log("DDDDD", this.userContributions)
        this.loaders.feedLoader = false;

        // console.log("DDDD", this.userContributions)
      }
    )
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

  openDetails(id) {
    this.navCtrl.push(ContributionDetailsPage, {id: id})
  }

  

}
