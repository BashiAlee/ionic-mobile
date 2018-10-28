import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { EditUserPage } from '../pages/user/edit-user/edit-user';
import { Camera } from '@ionic-native/camera';

import { AuthenticationProvider } from '../providers/authentication/authentication';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserProvider } from '../providers/user/user';
import { AboutMePage } from '../pages/user/about-me/about-me';
import { CreateContributionPage } from '../pages/create-contribution/create-contribution';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { ViewerProfilePage } from '../pages/viewer-profile/viewer-profile';
import { MyContributionPage } from '../pages/my-contribution/my-contribution';
import { MentorPage } from '../pages/mentor/mentor';
import { ContributionsProvider } from '../providers/contributions/contributions';
import { PopoverContributionComponent } from '../components/popover-contribution/popover-contribution';

import { ContributionDetailsPage } from '../pages/contribution-details/contribution-details';

import { UserPopoverComponent } from '../components/user-popover/user-popover';
import { MessagePopoverComponent } from '../components/message-popover/message-popover';
import { NotificationPopoverComponent } from '../components/notification-popover/notification-popover';
import { ApplicantFormPage } from '../pages/applicant-form/applicant-form';
import { HeaderComponent } from '../components/header/header';
import { MyEventsPage } from '../pages/my-events/my-events';
import { CreateEventPage } from '../pages/create-event/create-event';
import { EventsProvider } from '../providers/events/events';
import { ParentActivityLogPage } from '../pages/parent-activity-log/parent-activity-log';
import { MyFeedsPage } from '../pages/my-feeds/my-feeds';
import { SearchEventsPage } from '../pages/search-events/search-events';

@NgModule({
  declarations: [
    ApplicantFormPage,
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    EditUserPage,
    AboutMePage,
    CreateContributionPage,
    UserProfilePage,
    ViewerProfilePage,
    MyContributionPage,
    PopoverContributionComponent,
    ContributionDetailsPage,
    UserPopoverComponent,
    MessagePopoverComponent,
    NotificationPopoverComponent,
    HeaderComponent,
    MyEventsPage,
    CreateEventPage,
    MentorPage,
    ParentActivityLogPage,
    MyFeedsPage,
    SearchEventsPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ApplicantFormPage,
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    EditUserPage,
    AboutMePage,
    CreateContributionPage,
    UserProfilePage,
    ViewerProfilePage,
    MyContributionPage,

    PopoverContributionComponent,
    ContributionDetailsPage,

    UserPopoverComponent,
    MessagePopoverComponent,
    NotificationPopoverComponent,
    HeaderComponent,
    MyEventsPage,
    CreateEventPage,
    MentorPage,
    ParentActivityLogPage,
    MyFeedsPage,
    SearchEventsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticationProvider,
    UserProvider,
    ContributionsProvider,
    EventsProvider
  ]
})
export class AppModule {}
