import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { UserProvider } from '../../providers/user/user';
import { ContributionsProvider } from '../../providers/contributions/contributions';
import * as _ from 'lodash';
import { ContributionDetailsPage } from '../../pages/contribution-details/contribution-details';
import { FormGroup, FormControl } from '@angular/forms';



/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-events',
  templateUrl: 'search-events.html',
  providers: [AuthenticationProvider, UserProvider, ContributionsProvider]
})
export class SearchEventsPage {
  event: FormGroup;
  eventsList: any = [];
  namesList: any = [];
  user: any;
  categories: any = [];
  allFavorites : any = [];
  maincategory: any;
  sortedEvents: any = [];
  loading: any;
  
  followersIds: any = [];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserProvider,
    public authService: AuthenticationProvider,
    public contributionService: ContributionsProvider
  ) {
    this.user = this.authService.getCurrentUser();
    this.getCatNames();
    if (this.user) {
      this.loading = true;
      this.getFollowerList(this.user._id);


    } else if (!this.user) {
      this.loading = true;
      this.getAllEvents();
    }
  }
  ionViewDidLoad() {
    this.event = new FormGroup({
      maincategory: new FormControl(''),
        location: new FormControl(''),
        date: new FormControl(''),
    });
    this.eventsList = [];
    this.sortedEvents = [];
    console.log('ionViewDidLoad HomePage');
    if(this.user) {
      this.event.patchValue({
        location: this.user.City
      })
    } else {
      this.event.patchValue({
        location: ''
      })
    }
  }


  getCatNames() {
    this.contributionService.getAllCategoriesName()
    .subscribe(
      data => {
        if (data.status) {
          data.data.forEach(value => {
            this.namesList.push({
              name: value.Category
            })
          });
        } else {
          this.namesList = [];
        }
      }
    );
  }

  getAllEvents() {
    this.sortedEvents = [];
    this.eventsList = [];
    this.contributionService.getAllEvents()
      .subscribe(
        data => {
          if (data.status) {

            data.data.forEach(value => {
              // this.contributionService.parseHTML(value.ContributionText)
              // value.ContributionText =  this.sanitizer.bypassSecurityTrustHtml(value.ContributionText);
              this.getProfileById(value.UserID, value)
              if (value.AdminStatus && value.ContributionType=='event') {
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

      

              
                
                // value.ModalValue = this.modalArray;
                // this.modalArray = [".text-modal"];

                this.eventsList.push(value)
                // this.isViewing = false;
                
                console.log(this.categories)

              }
            });

            this.loading = false;
            // this.eventsList = data.Data;
            // console.log(data.Data)
            this.categories.splice(0, 0, {
              name: 'All'
            });
            this.categories = _.uniqBy(this.categories, 'name');
            this.maincategory = this.categories[0].name;
            this.sortedEvents = (this.eventsList || []).concat();

            // console.log("sort", this.sortedEvents)
          } else {
            this.sortedEvents = [];
            this.eventsList = [];
            this.loading = false;
          }

        },
        error => {});
  }

  searchEvent() {
    this.loading = true;
    this.sortedEvents = [];
    this.eventsList = [];
    this.contributionService.searchEvent(this.event.value)
      .subscribe(
        data => {
          if (data.Data) {

            data.Data.forEach(value => {
              // this.contributionService.parseHTML(value.ContributionText)
              // value.ContributionText =  this.sanitizer.bypassSecurityTrustHtml(value.ContributionText);
              this.getProfileById(value.UserID, value)
              if (value.AdminStatus && value.ContributionType=='event') {
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

      

              
                
                // value.ModalValue = this.modalArray;
                // this.modalArray = [".text-modal"];

                this.eventsList.push(value)
                // this.isViewing = false;
                
                console.log(this.categories)

              }
            });

            this.loading = false;
            // this.eventsList = data.Data;
            // console.log(data.Data)
            this.categories.splice(0, 0, {
              name: 'All'
            });
            this.categories = _.uniqBy(this.categories, 'name');
            this.maincategory = this.categories[0].name;
            this.sortedEvents = (this.eventsList || []).concat();

            // console.log("sort", this.sortedEvents)
          } else {
            this.sortedEvents = [];
            this.eventsList = [];
            this.loading = false;
          }

        },
        error => {});
  }



  getFollowerList(id) {
    let data = {userid: id}
    return new Promise((resolve, reject) => {
      this.userService.getFollower(data)
      .subscribe(data => {
       
        if(data.status) {
          resolve(this.followersIds = data.data);
          this.getAllEvents();
        } else if(!data.status){
           resolve(this.followersIds = null);
           this.getAllEvents();
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

  // console.log(this.eventsList)
}

  sortEvents(value) {
    console.log("FFFF", value)
    if(value == "All") {
      this.sortedEvents = (this.eventsList || []).concat();
    } else {
      this.sortedEvents =  this.eventsList.filter(contribution => contribution.MainCategory == value);
      console.log("DDDD", this.sortedEvents)
    }
  }
}
