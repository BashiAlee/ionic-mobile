import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { ParentProvider } from '../../providers/parent/parent';
import { UserProvider } from '../../providers/user/user';
import { ContributionsProvider } from '../../providers/contributions/contributions';
/**
 * Generated class for the ParentProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parent-profile',
  templateUrl: 'parent-profile.html',
  providers: [AuthenticationProvider, ParentProvider, UserProvider, ContributionsProvider]
})
export class ParentProfilePage {
  loading: any;
  user: any;
  kidsList: any = [];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthenticationProvider,
    public parentService: ParentProvider,
    public userService: UserProvider,
    public contributionService: ContributionsProvider) {
      this.user = this.authService.getCurrentUser();
      this.getKids();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParentProfilePage');
  }

  getKids() {
    this.loading = true;

    // this.messages.kidsLoader = true;
    // this.messages.activitiesLoader = true;
    this.parentService.GetParentsKids(this.user.Email)
    .subscribe(data => {
      if(!data.status) {
        this.loading = false;
        this.kidsList = [];
      } else if(data.status){
        this.loading = false;
        this.kidsList = data.data[0];
      }

      this.kidsList.KidsProfile = [];
      if(this.kidsList.Kids) {
        if(this.kidsList.Kids.length) {
          this.kidsList.Kids.forEach(kids => {
              this.getProfileByID(kids.KidID)
          });
        }


        // console.log(this.activityLog)
      }
      // this.messages.kidsLoader = false;
      this.loading = false;
      
      
    })
    
  }

  getProfileByID(data) {
    this.userService.viewprofileByEmail(data)
    .subscribe(data => {
      if(data.status) {
        if(data.data.Data) {
          this.kidsList.KidsProfile.push(data.data.Data[0])
        }
      }
    });

    console.log("FFF", this.kidsList)
  }

}
