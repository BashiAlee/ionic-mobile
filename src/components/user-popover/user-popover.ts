import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';


@Component({
  selector: 'user-popover',
  templateUrl: 'user-popover.html',
})
export class UserPopoverComponent {
  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }

}
