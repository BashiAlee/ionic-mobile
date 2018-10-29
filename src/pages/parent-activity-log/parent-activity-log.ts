import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { ParentProvider } from '../../providers/parent/parent';
import { UserProvider } from '../../providers/user/user';
import { ContributionsProvider } from '../../providers/contributions/contributions';

/**
 * Generated class for the ParentActivityLogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parent-activity-log',
  templateUrl: 'parent-activity-log.html',
  providers: [AuthenticationProvider, ParentProvider, UserProvider, ContributionsProvider]
})
export class ParentActivityLogPage {
  user: any;
  kidsList: any = [];
  activityLog: any = [];
  approvalList: any = [];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthenticationProvider,
    public parentService: ParentProvider,
    public userService: UserProvider,
    public contributionService: ContributionsProvider
  
  ) {
    this.user = this.authService.getCurrentUser();
    this.getKids();

    this.getMentorRequests(this.user.Email);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParentActivityLogPage');
  }
  getKids() {
    // this.loading = true;
    this.parentService.GetParentsKids(this.user.Email)
    .subscribe(data => {
      if(!data.status) {
        // this.loading = false;
        this.kidsList = [];
      } else if(data.status){
        this.kidsList = data.data[0];
      }
      console.log("ddd", this.kidsList)

      this.kidsList.KidsProfile = [];
      if(this.kidsList.Kids) {

        if(this.kidsList.Kids && this.kidsList.Kids.length) {
          this.kidsList.Kids.forEach(kids => {
            this.searchByEmail(kids.KidID)
            this.getFollowerByEmail(kids.KidID);


          });
        }


        // console.log(this.activityLog)
      }

  
      

      
      
    })
  }

  approveContribution(id) {
    // this.parentProfile.updateContributionStatus(id)
    // .subscribe(data => {
    //   this.ngOnInit();
    //   location.reload();

    // })
  }


  searchByEmail(email) {
    
    this.contributionService.getUserConstributionsbyEmail(email)
    .subscribe(
        data => {
          if(!data.status) {
            this.activityLog = [];
            // this.loading = false;
            return;
          }

          if(data.status && data.data.length) {
            data.data.forEach( cat => {
              //if(cat.ContributionStatus == 0) {
                this.activityLog.push(data.data)
              //}
              
            });
          }

          console.log("FFf", this.activityLog)
          // this.loading = false;
        

        
        
      },
   
      error => {
      });

  }


  getFollowerByEmail(email) {
   
    var data = {email: email}
    this.userService.getFollowerByEmail(data)
    .subscribe(
      data => {
       
        if(data.status) {
          if(data.data.Data) {
            data.data.Data.forEach(user => {
              // console.log("DDD", user)
              user.Follower.forEach(follower => {
                this.getProfileByID(follower.Userfollowerid,follower)
              });
              this.getProfileByID(user.UserID,user)
            })
            this.approvalList.push(data.data.Data[0])
          }
        }

        // if(data.Data) {
        //   // this.approvalList.push(data.Data[0])
        // }
        // this.messages.activitiesLoader = false;


        console.log(this.approvalList)
      },
      error => {
      });

  }

  getProfileByID(data,value) {
    this.userService.viewProfileById(data)
    .subscribe(data => {
      if(data.status) {
        value.FollowerName = data.data.FullName;
        value.ProfilePicture = data.data.ProfilePicture;
      }
    });
  }

  changeParentStatus(userid,followid,value) {
    // value.loadingParent = true;
    // this.parentProfile.changeParentStatus(userid,followid)
    // .subscribe(data => {
    //   if(data) {
    //     value.loadingParent = false;
    //     // this.ngOnInit();
    //     // location.reload();
    //   }
    // });
  }
  getMentorRequests(email) {
    
    // console.log("FFFF", email)
    // this.parentProfile.getParentMentorRequest(email)
    // .subscribe(data => {
    //   if(data.Data) {
    //     console.log("FFF", data.Data)
    //     this.mentorRequest = data.Data;
    //   } else {
    //     this.mentorRequest = [];
    //   }

    //   // console.log(this.mentorRequest)
    // });
  }

  changeMessageStatus(userid,followid,value) {
    // value.loading = true;
    // this.parentProfile.changeMessageStatus(userid,followid)
    // .subscribe(data => {
    //   if(data) {
    //     value.loading = true;
    //     this.ngOnInit();
    //     location.reload();
    //   }
    // });
  }

  approveMentorRequest(id) {
    // this.messages.loadingApprove = true;
    // this.parentProfile.approveMentorRequest(id)
    // .subscribe(data => {
    //   if(data) {
    //     // this.messages.loadingApprove = false;

    //     location.reload();
    //   }
    // });
  }

  rejectMentorForm(id) {
    // this.messages.rejectMentorReq = true;
    // var data = {
    //   userid: id
    // } 
    // this.parentProfile.rejectParentMentorRequest(data)
    // .subscribe(data => {
    //   if(data) {
    //     // this.messages.loadingApprove = false;
    //     this.messages.rejectMentorReq = false;
    //     location.reload();
    //   }
    // });
  }

}
