import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { EditUserPage } from '../pages/user/edit-user/edit-user';
import { CreateContributionPage } from '../pages/create-contribution/create-contribution';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { ViewerProfilePage } from '../pages/viewer-profile/viewer-profile';
import { MyContributionPage } from '../pages/my-contribution/my-contribution';

import { ContributionDetailsPage } from '../pages/contribution-details/contribution-details';

import { MentorPage } from '../pages/mentor/mentor';
import { ApplicantFormPage } from '../pages/applicant-form/applicant-form';
import { MyEventsPage } from '../pages/my-events/my-events';
import { CreateEventPage } from '../pages/create-event/create-event';
import { ParentActivityLogPage } from '../pages/parent-activity-log/parent-activity-log';
import { MyFeedsPage } from '../pages/my-feeds/my-feeds';

import { ParentProvider } from '../providers/parent/parent';
import { AuthenticationProvider } from '../providers/authentication/authentication';

import { SearchEventsPage } from '../pages/search-events/search-events';



@Component({
  templateUrl: 'app.html',
  providers: [AuthenticationProvider]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // rootPage: any = SignupPage;

  rootPage: any = SearchEventsPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public parentService: ParentProvider,
    public authService: AuthenticationProvider
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'My Contribution', component: MyContributionPage },
      { title: 'My Events', component: MyEventsPage },
      { title: 'My Mentors', component: MentorPage },
      { title: 'My Feed', component: MyFeedsPage },
      { title: 'Create Contribution', component: CreateContributionPage },
      { title: 'Create an Event', component: CreateEventPage },
      // { title: 'Events', component: HomePage },
      { title: 'Become a mentor', component: ApplicantFormPage },
      { title: 'Mentor', component: MentorPage },
      // { title: 'Feed', component: HomePage },
      { title: 'Parent Activity log', component: ParentActivityLogPage },
      // { title: 'Parent Profile', component: ListPage },
      // { title: 'Edit / Profile Settings', component: ListPage },
      // { title: 'application form', component: ApplicantFormPage },
      { title: 'Logout', component: ListPage }

    ];



  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    if(this.authService.isLoggedIn()) {
      var id = this.authService.getCurrentUser()._id;
      this.getMentorStatus(id)
  
    }

  }

  getMentorStatus(id) {
    this.parentService.getMentorFormStatus(id)
    .subscribe((data)=>{
      if(data) {
        localStorage.setItem('mentorStatus',data.status);
      }
    })
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    localStorage.clear();
    location.reload();
  }
}
