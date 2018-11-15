import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContributionsProvider } from '../../providers/contributions/contributions';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { PopoverController } from 'ionic-angular';
import { PopoverContributionComponent } from '../../components/popover-contribution/popover-contribution';
import { ContributionDetailsPage } from '../../pages/contribution-details/contribution-details';
import { UserProvider } from '../../providers/user/user';
import { EventsProvider } from '../../providers/events/events';
import { CreateEventPage } from '../create-event/create-event';

/**
 * Generated class for the MyContributionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-contribution',
  templateUrl: 'my-events.html',
})
export class MyEventsPage {
  eventsList: any = [];
  eventsDraftList: any = [];
  eventsPendingList: any = [];
  loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public contributionService: ContributionsProvider,
    public eventsService: EventsProvider,
    public authService: AuthenticationProvider,
    public userService: UserProvider,
    public popoverCtrl: PopoverController) {

      var email = this.authService.getCurrentUser().Email;
      console.log(email)
      var data = {
        useremail: email
      }
      this.getEventsByEmail(data);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyContributionPage');
  }
  presentPopover() {
    const popover = this.popoverCtrl.create(PopoverContributionComponent);
    popover.present();
  }
  editEvent(eventId){
    this.navCtrl.setRoot(CreateEventPage,{id:eventId})
  }
  getEventsByEmail(email) {
    this.loading = true;
    this.eventsService.searchEvents(email)
    .subscribe(
      data => {
<<<<<<< HEAD
        console.log(data)
        if(data.Data) {
          data.Data.forEach(value => {
            if(value.ContributionStatus!="Reject") {
=======
        if(data.status) {
          data.data.forEach(value => {
          if(value.ContributionStatus!="Reject") {
>>>>>>> 7dcedcb4b70315b9e8f91d579fa80a9bf12cb3ae
            if(value.AdminStatus && value.ContributionStatus == "Publish") {
              this.getProfileByID(value.UserID, value)
              this.eventsList.push(value);
              this.loading = false;
            } 
             if(!value.AdminStatus && value.ContributionStatus == "Publish") {
              this.getProfileByID(value.UserID, value)
              this.eventsPendingList.push(value);
              this.loading = false;
            } 
             if(value.ContributionStatus == "Draft") {
              this.getProfileByID(value.UserID, value)
              this.eventsDraftList.push(value);
              this.loading = false;
            } 
          } else {
            this.loading = false;
          }
<<<<<<< HEAD
=======
    
>>>>>>> 7dcedcb4b70315b9e8f91d579fa80a9bf12cb3ae
            
            // else {
            //   this.eventsList = [];
            //   this.eventsDraftList = [];
            //   this.eventsPendingList = [];
            //   this.loading = false;
            // }
            
          });
        } else {
          this.eventsList = [];
          this.eventsDraftList = [];
          this.eventsPendingList = [];
          this.loading = false;
        }
      }
    )
  }

  openDetails(id) {
    this.navCtrl.setRoot(ContributionDetailsPage, {id: id})
  }

  getProfileByID(id,value) {

    this.userService.viewProfileById(id)
      .subscribe(res => {
        if(res.status) {
           value.bio = res.data.Bio
        }
        
  
      });
  }

}
