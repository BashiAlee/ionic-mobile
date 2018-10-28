import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { UserPopoverComponent } from '../../components/user-popover/user-popover';
import { MessagePopoverComponent } from '../../components/message-popover/message-popover';
import { NotificationPopoverComponent } from '../../components/notification-popover/notification-popover';

import { Content } from 'ionic-angular';
/**
 * Generated class for the CreateContributionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-contribution',
  templateUrl: 'create-contribution.html',
})


export class CreateContributionPage {
  contribution_action: any;
  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController) { 

  

    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateContributionPage');
  }
  messagePopover(myEvent) {
    let popover = this.popoverCtrl.create(MessagePopoverComponent);
    popover.present({
      ev: myEvent
    });
  }

  scroll(elementId) {
    document.getElementById(elementId).style.setProperty("display", "block", "important")
      let y = document.getElementById(elementId).offsetTop;
      this.content.scrollTo(0, y, 500);
  
  }
  notificationPopover(myEvent) {
    let popover = this.popoverCtrl.create(NotificationPopoverComponent);
    popover.present({
      ev: myEvent
    });
  }
  userPopover(myEvent) {
    let popover = this.popoverCtrl.create(UserPopoverComponent);
    popover.present({
      ev: myEvent
    });
  }

}
