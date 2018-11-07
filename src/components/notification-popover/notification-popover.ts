import { Component } from '@angular/core';
import { App,ViewController} from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { UserProvider } from '../../providers/user/user';
import { NotificationListPage } from '../../pages/notification-list/notification-list';

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

}
