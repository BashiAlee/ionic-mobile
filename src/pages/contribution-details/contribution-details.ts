import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ContributionsProvider } from '../../providers/contributions/contributions';
import { UserProvider } from '../../providers/user/user';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;
/**
 * Generated class for the ContributionDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contribution-details',
  templateUrl: 'contribution-details.html',
  providers: [ContributionsProvider, UserProvider, AuthenticationProvider]
})

export class ContributionDetailsPage {
  modalArray: any;
  followersIds: any = [];
  contributionDetails: any = {};
  current: any = 0;
  allFavorites: any;
  user: any;
  id: any;
  first: any;
  options = {
    slidesPerView: 3
  }

  comment: any = {};
  userComment: any;
  detailLoader: any = false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public contributionService: ContributionsProvider,
    public userService: UserProvider,
    public authService: AuthenticationProvider,
    public domSanitizer: DomSanitizer,
    public toastCtrl: ToastController
  ) {
    this.modalArray = [".text-modal"];
    this.id = this.navParams.get('id')
    this.getContributionByID(this.id)
    this.user = this.authService.getCurrentUser();
    // this.getFollowers(this.user._id);

    var data = {
      _id: this.id,
      userid: this.user._id
    }
    this.contributionService.addView(data)
    .subscribe( data => {

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContributionDetailsPage');
    this.detailLoader = true;
  }

  moveForward(modalArray) {
    this.modalArray = modalArray;
    if (!this.first) {

      this.current++
    } else {
      this.first = false
    }
    if (this.current == this.modalArray.length) {
      this.current = 0
    }
    $(this.modalArray[this.current]).show();

    for (var i = 0; i < this.modalArray.length; i++) {

      if (this.current == i) {

      } else {

        $(this.modalArray[i]).hide();
      }
    }
    // console.log("FFFF", this.modalArray, this.current,this.first)
  }

  moveBackward(modalArray) {
    this.modalArray = modalArray;
    this.current--
      if (this.current == -1) {
        this.current = this.modalArray.length - 1;
      }
    $(modalArray[this.current]).show();


    for (var i = 0; i < this.modalArray.length; i++) {

      if (this.current == i) {

      } else {

        $(this.modalArray[i]).hide();
      }
    }

  }

  getContributionByID(id) {
    this.contributionService.searchContributionByContributionId(id).subscribe(data =>{
     if(data.status) {
      this.contributionDetails = data.data
      this.getFollowers(this.user._id)
      .then((data) => {
      if(data) {
          if (this.followersIds.Follower.length) {
            this.followersIds.Follower.forEach(follower => {
              if (follower.Userfollowerid === this.contributionDetails.UserID) {
                this.contributionDetails.hasFollowing = true;
              }
              if((follower.Userfollowerid === this.contributionDetails.UserID) && follower.MessageStatus) {
                this.contributionDetails.canSendMessage = true;
              }

              if((follower.Userfollowerid === this.contributionDetails.UserID) && follower.ParentStatus) {
                this.contributionDetails.isAllowed = true;
              }
              
            });
          }
        }
          // this.viewProfileByID(this.contributionDetails.UserID, this.contributionDetails)
          if (this.user) {
            this.getLikesAndComments(this.contributionDetails._id, this.contributionDetails);
          } else {
            this.getAllCommentsAndLikes(this.contributionDetails._id, this.contributionDetails)
          }
         
          if (this.contributionDetails.Images[0]) {
            if (this.contributionDetails.Images[0].Imagestatus) {
              this.modalArray.push(".modal-gallery-view")
            }
          }
          if (this.contributionDetails.AudioPath) {
            this.modalArray.push(".modal-audio-view")
          }
          if (this.contributionDetails.Videos) {
            this.modalArray.push(".modal-video-view")
            var videoClient = this.contributionDetails.Videos.search("you");
            if(videoClient>-1) {
             let id = this.getYouTubeId(this.contributionDetails.Videos);
             let videoSrc = id
              this.contributionDetails.Videos = videoSrc;
            //  this.contributionDetails.Videos = videoSrc;
              // $(document).ready(function() {
                // document.getElementById('videoModal').setAttribute("src",videoSrc);
              // $("#videoModal").attr('src', videoSrc);
          //})
          console.log("DDD", videoSrc)
            } else {
             let id = this.GetVimeoIDbyUrl(this.contributionDetails.Videos);
             let videoSrc = id
             this.contributionDetails.Videos = videoSrc;
            //  this.contributionDetails.Videos =videoSrc;
              // $(document).ready(function() {
                // document.getElementById('videoModal').setAttribute("src",videoSrc);
              // $("#videoModal").attr('src', videoSrc);
          // })
            }
          
          }
  
          if (this.contributionDetails.Website) {
            if(this.contributionDetails.Website[0].WebsiteTitle) {
              this.modalArray.push(".modal-links-view")
            }
          }
  
          this.contributionDetails.ModalValue = this.modalArray;

          console.log("detaaaaaaaaa", this.contributionDetails)
       
      });
     }

    });
  }

  getFollowers(id) {
    // let data = {userid: id}
    return new Promise((resolve, reject) => {
      this.userService.getFollower(id)
      .subscribe(data => {
       
        if(data.status) {
          resolve(this.followersIds = data.data);
        } else if(!data.status){
           resolve(this.followersIds = null);
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
addMentor(id,age,contributionDetails) {
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
            contributionDetails.hasFollowing=true
            contributionDetails.isAllowed=true
          }
        }
        // this.getFollowerList();
      },
      error => {});
}

unFollowMentor(id,contributionDetails) {
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
          contributionDetails.hasFollowing=false
          contributionDetails.isAllowed=false
        }
      },
      error => {});
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
      if(value.social.Comments.length) {
        // console.log("heree",value.social.Comments )
        value.social.Comments.forEach(value => {
          this.viewProfileByID(value.CommentUserID, value)
        });
        
      }
      this.detailLoader = false;
  })
  // this.loading = false;
}
  getYouTubeId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
      return "https://www.youtube.com/embed/"+match[2];
    } else {
      return 'error';
    }
  }
  GetVimeoIDbyUrl(url) {
    var id = false;
    $.ajax({
      url: 'https://vimeo.com/api/oembed.json?url='+url,
      async: false,
      success: function(response) {
        if(response.video_id) {
          id = response.video_id;
        }
      }
    });
    return "https://player.vimeo.com/video/"+id;
  }
getAllCommentsAndLikes(id, value) {

  this.contributionService.getAllCommentsAndLikes()
    .subscribe(data => {
      this.allFavorites = data.Data;
      if (this.allFavorites) {
        var result = this.allFavorites.filter(obj => obj.ContributionID === id);
        if (result.length && result[0]._id != null) {
          value.social = {
            Likes: result[0].Likes,
            Comments: result[0].Comments
          };
        } else if (result._id == null) {
          value.social = {
            Likes: [],
            Comments: []
          };
        }
      } else {
        value.social = {
          Likes: [],
          Comments: []
        };
      }
      // console.log("Value", value)
      if(value.social.Comments.length) {
        // console.log("heree",value.social.Comments )
        value.social.Comments.forEach(value => {
          this.viewProfileByID(value.CommentUserID, value)
        });
        
      }

      this.detailLoader = false;

    })

  // console.log(this.contributionList)
}
viewProfileByID(id, value) {
  var user;
  this.userService.viewProfileById(id)
  .subscribe((data) => {
    if(data.status) {
      user = data.data

      value.profilePicture = user.ProfilePicture;
      value.name = user.FullName;
      value.userType = user.UserType;
      if (user.Bio) {
        value.bio = user.Bio
      } else {
        value.bio = '-'
      }
     
    }
    // this.detailsLoader = false;
  })
}
createComment() {
  // this.commentLoader = true;
  this.comment.comments = [{
    commentuserid: '',
    comment: ''
  }];

  this.comment.contributionid = this.contributionDetails._id;
  this.comment.comments[0].commentuserid = this.user._id;
  this.comment.comments[0].comment = this.userComment;

  
    this.contributionService.createComment(this.comment)
    .subscribe(data => {
      
      console.log("Comment",data)

      this.userComment = '';

      if (this.user) {
        this.getLikesAndComments(this.contributionDetails._id, this.contributionDetails);
      } else {
        this.getAllCommentsAndLikes(this.contributionDetails._id, this.contributionDetails)
      }
    });
}
deleteComment(commentID, id) {
  var data = {
    contributionid: id,
    comments: [{
      commentid: commentID
    }]
  }

  this.contributionService.deleteComment(data)
  .subscribe( data => {
    if(data) {
      let toast = this.toastCtrl.create({
        message: 'Comment deleted Successfully',
        duration: 3000,
        position: 'bottom'
      });
    
      toast.present();
      // toastr.success('Comment Deleted','Success')
      this.getLikesAndComments(this.contributionDetails._id, this.contributionDetails);
    } else {
      // toastr.error('Error Deleting Comment','Error')
    }
  })
}

openFold(type) {
  if(type =='video') {
    $('.text-modal').hide();
    $('.modal-video-view').show();
    $('.modal-audio-view').hide();
    $('.modal-gallery-view').hide();
    $('.modal-links-view').hide();
  }
  if(type == 'audio') {
    $('.text-modal').hide();
    $('.modal-video-view').hide();
    $('.modal-audio-view').show();
    $('.modal-gallery-view').hide();
    $('.modal-links-view').hide();
  }
}

shareTwitter(e) {
  var url = "https://cliiimb.com/spotlight-details/"+ this.id;
  //  var _this = this;
  e.preventDefault();
  var twitterWindow = window.open('https://twitter.com/share?url=' + url, 'twitter-popup', 'height=350,width=600');
  if(twitterWindow.focus) { twitterWindow.focus(); }
    return false;
 }
 shareFacebook(e) {
  var url = "https://cliiimb.com/spotlight-details/"+ this.id;
  e.preventDefault();
  var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, 'facebook-popup', 'height=350,width=600');
  if(facebookWindow.focus) { facebookWindow.focus(); }
    return false;
 }
 shareGooglePlus(e) {
  var url = "https://cliiimb.com/spotlight-details/"+ this.id;
  //  var _this = this;
  e.preventDefault();
  var GooglePlusWindow = window.open('https://plus.google.com/share?url=' + url, 'googleplus-popup', 'height=350,width=600');
  if(GooglePlusWindow.focus) { GooglePlusWindow.focus(); }
    return false;
 }
 shareLinkedIn(e) {
  var url = "https://cliiimb.com/spotlight-details/"+ this.id;
  var title = "Cliimb";
  var text = url;
  window.open('http://www.linkedin.com/shareArticle?mini=true&url='+url, 'sharer', 'left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
 }

 openEmailClient() {
  var url = "https://cliiimb.com/spotlight-details/"+ this.id;
  var email = '';
  var subject = 'Cliiimb';
  var emailBody = url;
  let Link="mailto:"+email+"?subject="+subject+"&body="+emailBody;
  window.open(Link, "_system");
  // window.open("mailto:"+email+"?subject="+subject+"&body="+emailBody, '_system');
 }


}
