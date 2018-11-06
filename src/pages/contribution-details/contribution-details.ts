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
  slides = [
    {
      title: "Welcome to the Docs!",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
      image: "assets/img/ica-slidebox-img-1.png",
    },
    {
      title: "What is Ionic?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "assets/img/ica-slidebox-img-2.png",
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "assets/img/ica-slidebox-img-3.png",
    }
  ];
  comment: any = {};
  userComment: any;
  
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

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContributionDetailsPage');
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
    console.log("FFFF", this.modalArray, this.current,this.first)
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
       
            //  this.contributionDetails.Videos = videoSrc;
              $(document).ready(function() {
              $("#videoModal").attr('src', videoSrc);
          })
            } else {
             let id = this.GetVimeoIDbyUrl(this.contributionDetails.Videos);
             let videoSrc = id
       
            //  this.contributionDetails.Videos =videoSrc;
              $(document).ready(function() {
              $("#videoModal").attr('src', videoSrc);
          })
            }
          
          }
  
          if (this.contributionDetails.Website) {
            if(this.contributionDetails.Website[0].WebsiteTitle) {
              this.modalArray.push(".modal-links-view")
            }
          }
  
          this.contributionDetails.ModalValue = this.modalArray;

          console.log("FFFF", this.contributionDetails)
       
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
      value.bio = user.Bio
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


}
