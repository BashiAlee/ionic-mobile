import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { MessagePopoverComponent } from '../message-popover/message-popover';
import { NotificationPopoverComponent } from '../notification-popover/notification-popover';
import { UserPopoverComponent } from '../user-popover/user-popover';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {
  user: any;
  constructor( 
    public popoverCtrl: PopoverController,
    public authService: AuthenticationProvider,
    public domSanitizer: DomSanitizer,
  
  ) {
    this.user = this.authService.getCurrentUser();
    console.log(this.user)
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

}
