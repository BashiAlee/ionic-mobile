import { Component } from '@angular/core';
import { App,ViewController} from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { UserProvider } from '../../providers/user/user';
import { NotificationListPage } from '../../pages/notification-list/notification-list';
import { ContributionDetailsPage } from '../../pages/contribution-details/contribution-details';
import { ViewerProfilePage } from '../../pages/viewer-profile/viewer-profile';
import * as _ from 'lodash';
/**
 * Generated class for the NotificationPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'notification-popover',
  templateUrl: 'notification-popover.html'
})
export class NotificationPopoverComponent {

  text: string;
  localData: any;
  user: any;
  notifications: any = [];
  loading: any;
  constructor(
    public authService: AuthenticationProvider,
    public userService: UserProvider,
    public viewCtrl: ViewController,
    public appCtrl: App

  ) {
  
    this.localData = this.authService.getCurrentUser();
    this.user = this.authService.getCurrentUser();
    this.getAllNotifications();
  }
  close() {
    this.viewCtrl.dismiss();
  }
  viewAllNotifications(){
    this.appCtrl.getRootNav().setRoot(NotificationListPage)
    this.close()
  }
  getAllNotifications() {
    this.loading = true;
    var id = {userid: this.localData._id}
    this.userService.getAllNotifications(id)
    .subscribe(
      data => {
        var bool1 = false;
        var bool2 = false;
         
        if(data) {
          console.log("DDD", data.data)
        //  this.newNotification = data.NewNotification;
         this.notifications = _.sortBy(data.data, 'NotificationTime').reverse();
         console.log("ASfter Sort", this.notifications)
         this.notifications.forEach(notification => {
           
         if(notification.Type == "AdminMentorRequest" && notification.RequestAprove && this.user.Age > 17) {
           this.localData.MentorStatus = 1;
           localStorage.setItem('user', JSON.stringify(this.localData))
         } else if(notification.Type=="ParentMentorRequest" && notification.RequestAprove){
           bool1 = true;
           // this.localData.MentorStatus = 1;
           // localStorage.setItem('user', JSON.stringify(this.localData))
         }
         else if(notification.Type=="AdminMentorRequest" && notification.RequestAprove){
           bool2 = true;
           // this.localData.MentorStatus = 1;
           // localStorage.setItem('user', JSON.stringify(this.localData))
         }
 
 
         if(this.user.UserType=='admin') {
           this.localData.MentorStatus = 1;
           localStorage.setItem('user', JSON.stringify(this.localData))
         }
         });
         if(bool1 && bool2) {
           this.localData.MentorStatus = 1;
            localStorage.setItem('user', JSON.stringify(this.localData))
         }
         this.loading = false;
         // if(this.notifications.AdminMentorRequest && this.user.Age > 17) {
         //   this.localData.MentorStatus = 1;
         //   localStorage.setItem('user', JSON.stringify(this.localData))
         // } else if(this.notifications.ParentMentorRequest && this.notifications.AdminMentorRequest){
         //   this.localData.MentorStatus = 1;
         //   localStorage.setItem('user', JSON.stringify(this.localData))
         // }
         // if(this.user.UserType=='admin') {
         //   this.localData.MentorStatus = 1;
         //   localStorage.setItem('user', JSON.stringify(this.localData))
         // }
        }
      //  if(data.status && data.data) {
      //   this.notifications = data.data;
      //   if(this.notifications.AdminMentorRequest && this.user.Age > 17) {
      //     this.localData.MentorStatus = 1;
      //     localStorage.setItem('user', JSON.stringify(this.localData))
      //   } else if(this.notifications.ParentMentorRequest && this.notifications.AdminMentorRequest){
      //     this.localData.MentorStatus = 1;
      //     localStorage.setItem('user', JSON.stringify(this.localData))
      //   }
      //   if(this.user.UserType=='admin') {
      //     this.localData.MentorStatus = 1;
      //     localStorage.setItem('user', JSON.stringify(this.localData))
      //   }
      //   this.loading = false;
      //  } 
       
       else{
         this.loading = false;
         this.notifications = null;
       }
        
      }
    );
  }

  openDetails(id) {
    this.appCtrl.getRootNav().push(ContributionDetailsPage, {id: id})
  }

  openUserProfile(id) {
    this.appCtrl.getRootNav().setRoot(ViewerProfilePage, {userid: id})
  }

}
