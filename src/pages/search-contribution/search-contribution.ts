import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContributionsProvider } from '../../providers/contributions/contributions';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { PopoverController } from 'ionic-angular';
import { PopoverContributionComponent } from '../../components/popover-contribution/popover-contribution';
import { ContributionDetailsPage } from '../../pages/contribution-details/contribution-details';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the MyContributionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-contribution',
  templateUrl: 'search-contribution.html',
  providers: [UserProvider, ContributionsProvider, AuthenticationProvider]
})
export class SearchContributionPage {
  contributionsList: any = [];
  loading: any;
  user: any;
  query: any;
  allFavorites: any = [];
  followersIds: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public contributionService: ContributionsProvider,
    public authService: AuthenticationProvider,
    public userService: UserProvider,
    public popoverCtrl: PopoverController) {

      this.user = this.authService.getCurrentUser();
      this.query = this.navParams.get('query')
      if(this.user) {
        this.loading = true;
        this.getFollowerList(this.user._id)
      } else {
        this.loading = true;
        this.searchContribution(this.query)
      }
   
      // this.contributionService.se
      // this.getContributionByEmail(email);
    
      // this.searchContribution(this.query);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyContributionPage');
  }
  presentPopover() {
    const popover = this.popoverCtrl.create(PopoverContributionComponent);
    popover.present();
  }

  searchContribution(val) {
    var data = {
      subcategories:val
    }

    this.contributionService.searchContribution(data)
    .subscribe( data => {
      if(data.Data) {
        data.Data.forEach(value => {
          // this.contributionService.parseHTML(value.ContributionText)
          // value.ContributionText =  this.sanitizer.bypassSecurityTrustHtml(value.ContributionText);
          this.getProfileByID(value.UserID, value)
          if (value.AdminStatus && value.ContributionType=='contribution') {
            if (this.followersIds) {
              if (this.followersIds.Follower && this.followersIds.Follower.length) {
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
            // this.getLikesAndComments(value._id);
            if (this.user) {
              this.getLikesAndComments(value._id, value);
            } else {
              this.getAllCommentsAndLikes(value._id, value)
            }

  

          
            
            // value.ModalValue = this.modalArray;
            // this.modalArray = [".text-modal"];

            this.contributionsList.push(value)
  
            this.loading = false;
          }
        });
      } else {
        this.loading = false;
        this.contributionsList = [];
      }
    });

  }


  getProfileByID(id,value) {

    this.userService.viewProfileById(id)
      .subscribe(res => {
        if(res.status) {
           value.bio = res.data.Bio
        }
        
  
      });
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
  openDetails(id) {
    this.navCtrl.setRoot(ContributionDetailsPage, {id: id})
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

  getFollowerList(id) {
    let data = {userid: id}
    return new Promise((resolve, reject) => {
      this.userService.getFollower(data)
      .subscribe(data => {
       
        if(data.status) {
          resolve(this.followersIds = data.data);
          this.searchContribution(this.query);
        } else if(!data.status){
           resolve(this.followersIds = null);
           this.searchContribution(this.query);
        }
    });
  })
}


}
