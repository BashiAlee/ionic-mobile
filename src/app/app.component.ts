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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = CreateContributionPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'My Contribution', component: LoginPage },
      { title: 'My Events', component: ListPage },
      { title: 'My Mentors', component: HomePage },
      { title: 'My Feed', component: ListPage },
      { title: 'Create Contribution', component: CreateContributionPage },
      { title: 'Create an Event', component: ListPage },
      { title: 'Events', component: HomePage },
      { title: 'Become a mentor', component: ListPage },
      { title: 'Feed', component: HomePage },
      { title: 'Parent Activity log', component: ListPage },
      { title: 'Parent Profile', component: ListPage },
      { title: 'Edit / Profile Settings', component: ListPage },
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
