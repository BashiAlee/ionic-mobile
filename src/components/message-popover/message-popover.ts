import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the MessagePopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'message-popover',
  templateUrl: 'message-popover.html'
})
export class MessagePopoverComponent {

  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
}

