import { Component } from '@angular/core';

/**
 * Generated class for the NotificationPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'notification-popover',
  templateUrl: 'notification-popover.html'
})
export class NotificationPopoverComponent {

  text: string;

  constructor() {
    console.log('Hello NotificationPopoverComponent Component');
    this.text = 'Hello World';
  }

}
