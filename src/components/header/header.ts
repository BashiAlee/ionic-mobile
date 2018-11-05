import { Component } from '@angular/core';
import { PopoverController, NavController } from 'ionic-angular';
import { MessagePopoverComponent } from '../message-popover/message-popover';
import { NotificationPopoverComponent } from '../notification-popover/notification-popover';
import { UserPopoverComponent } from '../user-popover/user-popover';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { SearchContributionPage } from '../../pages/search-contribution/search-contribution';

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header',
  templateUrl: 'header.html',
  providers: [AuthenticationProvider]
})
export class HeaderComponent {

  text: string;
  user: any;
  query: any;
  showSearch: any = false;

  constructor( public popoverCtrl: PopoverController,
    public navCtrl: NavController,
  public authService: AuthenticationProvider
  ) {
    this.user = this.authService.getCurrentUser();
    console.log('Hello HeaderComponent Component');
    this.text = 'Hello World';
  }

  messagePopover(myEvent) {
    let popover = this.popoverCtrl.create(MessagePopoverComponent);
    popover.present({
      ev: myEvent
    });
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

  onInput(e) {
    console.log("FFFF")
  }

  
  onCancel(e) {
    this.showSearch = false;
  }

  searchByKeyword(e) {
    this.navCtrl.setRoot(SearchContributionPage, {query: this.query})
  }

}
