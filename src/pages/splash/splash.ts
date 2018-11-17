
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,public viewCtrl: ViewController, public splashScreen: SplashScreen,
  private menu: MenuController) {
  }

  ionViewDidEnter() {
 
    // this.splashScreen.hide();
 
    setTimeout(() => {
      // this.viewCtrl.dismiss();
      this.navCtrl.setRoot(LoginPage);
    }, 5000);
    this.menu.swipeEnable(false);
 
  }


  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
   }

}
