import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { UserProvider } from '../../providers/user/user';
import { App } from 'ionic-angular';
import { ContributionDetailsPage } from '../../pages/contribution-details/contribution-details';
import { ViewerProfilePage } from '../viewer-profile/viewer-profile';
/**
 * Generated class for the NotificationListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification-list',
  templateUrl: 'notification-list.html',
})
export class NotificationListPage {

  text: string;
  localData: any;
  user: any;
  notifications: any = [];
  loading: any;
  constructor(
    public navCtrl: NavController, 
    public authService: AuthenticationProvider,
    public userService: UserProvider,
    public appCtrl: App

  ) {
    this.localData = this.authService.getCurrentUser();
    this.user = this.authService.getCurrentUser();
    this.getAllNotifications();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationListPage');
  }
  getAllNotifications() {
    this.loading = true;
    var id = {userid: this.localData._id}
    this.userService.getAllNotifications(id)
    .subscribe(
      data => {
       if(data.status) {
        this.notifications = data.data[0];
        if(this.notifications.AdminMentorRequest && this.user.Age > 17) {
          this.localData.MentorStatus = 1;
          localStorage.setItem('user', JSON.stringify(this.localData))
        } else if(this.notifications.ParentMentorRequest && this.notifications.AdminMentorRequest){
          this.localData.MentorStatus = 1;
          localStorage.setItem('user', JSON.stringify(this.localData))
        }
        if(this.user.UserType=='admin') {
          this.localData.MentorStatus = 1;
          localStorage.setItem('user', JSON.stringify(this.localData))
        }
        this.loading = false;
       } else if(!data.status){
        this.loading = false;
         this.notifications = null;
        //  this.notifications = 'No';
       }
        
      }
    );
  }
  openDetails(id) {
    this.navCtrl.push(ContributionDetailsPage, {id: id})
  }

  openUserProfile(id) {
    this.navCtrl.setRoot(ViewerProfilePage, {userid: id})
  }
}
