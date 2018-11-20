import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SplashPage } from '../pages/splash/splash';
 
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { EditUserPage } from '../pages/user/edit-user/edit-user';
import { CreateContributionPage } from '../pages/create-contribution/create-contribution';
import { MyContributionPage } from '../pages/my-contribution/my-contribution';
import { MentorPage } from '../pages/mentor/mentor';
import { ApplicantFormPage } from '../pages/applicant-form/applicant-form';
import { MyEventsPage } from '../pages/my-events/my-events';
import { CreateEventPage } from '../pages/create-event/create-event';
import { ParentActivityLogPage } from '../pages/parent-activity-log/parent-activity-log';
import { MyFeedsPage } from '../pages/my-feeds/my-feeds';
import { ParentProvider } from '../providers/parent/parent';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { SearchEventsPage } from '../pages/search-events/search-events';
import { ParentProfilePage } from '../pages/parent-profile/parent-profile';
import { PreferencesPage } from '../pages/preferences/preferences';

@Component({
  templateUrl: 'app.html',
  providers: [AuthenticationProvider]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SplashPage;
  // rootPage: any = MessagePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public parentService: ParentProvider,
    public authService: AuthenticationProvider,
    public modalCtrl: ModalController
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'My Contributions', component: MyContributionPage },
      { title: 'My Events', component: MyEventsPage },
      { title: 'My Mentors', component: MentorPage },
      { title: 'My Feed', component: MyFeedsPage },
      { title: 'Create Contribution', component: CreateContributionPage },
      { title: 'Create an Event', component: CreateEventPage },
      { title: 'Become a mentor', component: ApplicantFormPage },
      { title: 'Mentor', component: MentorPage },
      { title: 'Parent Activity log', component: ParentActivityLogPage },
      { title: 'Parent Profile', component: ParentProfilePage },
      { title: 'Edit / Profile Settings', component: EditUserPage },
      { title: 'Search Events', component: SearchEventsPage },
      { title: 'preferences', component: PreferencesPage },
      { title: 'Logout', component: ListPage },

    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      // let splash = this.modalCtrl.create(SplashPage);
      //       splash.present();
      // this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openHomePage() {
    this.nav.setRoot(HomePage)
  }

  logout() {
    localStorage.clear();
    location.reload();
  }
}
