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


@NgModule({
  declarations: [
    MyApp,
    // HomePage,
    // ListPage,
    // LoginPage,
    // SignupPage,
    // EditUserPage,
    // AboutMePage,
    // CreateContributionPage,
    UserProfilePage,
    ViewerProfilePage
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
    MyApp,
    // HomePage,
    // ListPage,
    // LoginPage,
    // SignupPage,
    // EditUserPage,
    // AboutMePage,
    // CreateContributionPage,
    UserProfilePage,
    ViewerProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticationProvider,
    UserProvider
  ]
})
export class AppModule {}
