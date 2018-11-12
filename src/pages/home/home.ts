import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { UserProvider } from '../../providers/user/user';
import { ContributionsProvider } from '../../providers/contributions/contributions';
import * as _ from 'lodash';
import { ContributionDetailsPage } from '../../pages/contribution-details/contribution-details';
import { ViewerProfilePage } from '../viewer-profile/viewer-profile';
import Typed from 'typed.js';
import { SearchEventsPage } from '../../pages/search-events/search-events';
import { LearnMoreMentorPage } from '../learn-more-mentor/learn-more-mentor';

import { AboutUsPage } from '../about-us/about-us';
import { HowToProtectPage } from '../how-to-protect/how-to-protect';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AuthenticationProvider, UserProvider, ContributionsProvider]
})
export class HomePage {
  contributionList: any = [];
  user: any;
  categories: any = [];
  allFavorites : any = [];
  maincategory: any;
  sortedContributions: any = [];
  loading: any;
  
  followersIds: any = [];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserProvider,
    public authService: AuthenticationProvider,
    public contributionService: ContributionsProvider,
    public toastCtrl: ToastController
  ) {
    this.user = this.authService.getCurrentUser();

    if (this.user) {
      this.loading = true;
      this.getFollowerList(this.user._id);


    } else if (!this.user) {
      this.loading = true;
      this.getAllContributions();
    }
  }

  ionViewDidLoad() {
    this.contributionList = [];
    this.sortedContributions = [];

    
      new Typed('#typed', {
      strings: ["COACHABLE", "HUMBLE", "RESILIENT", "UNIQUE", "VIBRANT", "FOCUSED", "VICTORIOUS", "CREATIVE", "PREPARED", "AMBITIOUS", "INNOVATIVE", "COMMITTED", "YOURSELF", "ABLE", "GREATNESS", "AMAZING", "LEADERS", "THE CHANGE", "STRONG", "HEALTHY", "HAPPY", "POWERFUL", "GENIUS", "MOTIVATED", "A GAMECHANGER", "INSPIRED", "THE LIGHT"," THE FUTURE", "REAL"],
      typeSpeed: 100,
      backSpeed: 100,
      cursorChar: '',
      shuffle: true,
      smartBackspace: false,
      loop: true
    });
    
  }
  showEvents(){
    this.navCtrl.setRoot(SearchEventsPage);

  }
  getAllContributions() {

    this.contributionService.getAllContribution()
      .subscribe(
        data => {
          if (data.status) {

            data.data.forEach(value => {
              // this.contributionService.parseHTML(value.ContributionText)
              // value.ContributionText =  this.sanitizer.bypassSecurityTrustHtml(value.ContributionText);
              this.getProfileById(value.UserID, value)
              if (value.AdminStatus && value.ContributionType=='contribution') {
                if (this.followersIds) {
                  if (this.followersIds.Follower.length) {
                    this.followersIds.Follower.forEach(follower => {
                      if (follower.Userfollowerid === value.UserID) {
                        value.hasFollowing = true;
                      }
                      if((follower.Userfollowerid === value.UserID) && follower.MessageStatus) {
                        value.canSendMessage = true;
                      }
                      if((follower.Userfollowerid === value.UserID) && follower.ParentStatus) {
                        value.isAllowed = true;
                      }
                      
                    });
                  }

                 
                }
                if(value.MainCategory) {
                  this.categories.push({
                    name: value.MainCategory
                  })
                }
                // this.getLikesAndComments(value._id);
                if (this.user) {
                  this.getLikesAndComments(value._id, value);
                } else {
                  this.getAllCommentsAndLikes(value._id, value)
                }

                // console.log("FFFFF", value)
                // value.ModalValue = this.modalArray;
                // this.modalArray = [".text-modal"];

                this.contributionList.push(value)
                // this.isViewing = false;
                
                // console.log(this.contributionList)

              }
            });

            this.loading = false;
            // this.contributionList = data.Data;
            // console.log(data.Data)
            this.categories.splice(0, 0, {
              name: 'All'
            });
            this.categories = _.uniqBy(this.categories, 'name');
            this.maincategory = this.categories[0].name;
            this.sortedContributions = (this.contributionList || []).concat();

            // console.log("sort", this.sortedContributions)
          } else {
            this.sortedContributions = [];
            this.contributionList = [];
            this.loading = false;
          }

        },
        error => {});
  }

  getFollowerList(id) {
    return new Promise((resolve, reject) => {
      this.userService.getFollower(id)
      .subscribe(data => {
        if(data.status) {
          resolve(this.followersIds = data.data);
          this.getAllContributions();
        } else if(!data.status){
           resolve(this.followersIds = null);
           this.getAllContributions();
        }
    });
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

openDetails(id) {
  this.navCtrl.setRoot(ContributionDetailsPage, {id: id})
}

getProfileById(id,value) {

  this.userService.viewProfileById(id)
    .subscribe(res => {
      if(res.status) {
        if(res.data.bio) {
          value.bio = res.data.bio;
        } else {
          value.bio = '-'
        }
        value.userType = res.data.UserType;
      }
      

    });
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
getAllCommentsAndLikes(id, value) {

  this.contributionService.getAllCommentsAndLikes()
    .subscribe(data => {
      this.allFavorites = data.data;
      if (this.allFavorites) {
        var result = this.allFavorites.filter(obj => obj.ContributionID === id);
          value.social = {
            Likes: result[0].Likes,
            Comments: result[0].Comments
        }
      } else {
        value.social = {
          Likes: [],
          Comments: []
        };
      }
    })

  // console.log(this.contributionList)
}

  sortContributions(value) {
    console.log("FFFF", value)
    if(value == "All") {
      this.sortedContributions = (this.contributionList || []).concat();
    } else {
      this.sortedContributions =  this.contributionList.filter(contribution => contribution.MainCategory == value);
      console.log("DDDD", this.sortedContributions)
    }
  }

  addMentor(id,age) {
    if(age < 18) {
      let toast = this.toastCtrl.create({
        message: 'Your Request for approval has been sent to your parent',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      // toastr.success('Your Request for approval has been sent to your parent','Success')
    }
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
    console.log(data)

          // this.getFollowerList();
        },
        error => {});
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
    console.log(data)

        },
        error => {});
  }
  

  openUserProfile(UserID) {
    this.navCtrl.setRoot(ViewerProfilePage, {userid: UserID})
  }

  goToLearnMentorPage() {
    this.navCtrl.setRoot(LearnMoreMentorPage)
  }

  goToAboutUS() {
    this.navCtrl.setRoot(AboutUsPage)
  }

  goToProtectionPage() {
    this.navCtrl.setRoot(HowToProtectPage)
  }
}
