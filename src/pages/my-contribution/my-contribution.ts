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
  selector: 'page-my-contribution',
  templateUrl: 'my-contribution.html',
})
export class MyContributionPage {
  contributionsList: any = [];
  loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public contributionService: ContributionsProvider,
    public authService: AuthenticationProvider,
    public userService: UserProvider,
    public popoverCtrl: PopoverController) {

      var email = this.authService.getCurrentUser().Email;
      this.getContributionByEmail(email);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyContributionPage');
  }
  presentPopover() {
    const popover = this.popoverCtrl.create(PopoverContributionComponent);
    popover.present();
  }
  getContributionByEmail(email) {
    this.loading = true;
    this.contributionService.getUserConstributionsbyEmail(email)
    .subscribe(
      data => {
        if(data.status) {
          data.data.forEach(value => {
            this.getProfileByID(value.UserID, value)
            if(value.AdminStatus) {
              this.contributionsList.push(value);
              this.loading = false;
            } else {
              this.contributionsList = [];
              this.loading = false;
            }
            
          });
        } else {
          this.contributionsList = [];
          this.loading = false;
        }
      }
    )
  }

  openDetails() {
    this.navCtrl.setRoot(ContributionDetailsPage)
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
