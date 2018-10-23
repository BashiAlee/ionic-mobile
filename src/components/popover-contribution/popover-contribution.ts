import { Component } from '@angular/core';

/**
 * Generated class for the PopoverContributionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover-contribution',
  templateUrl: 'popover-contribution.html'
})
export class PopoverContributionComponent {

  text: string;

  constructor() {
    console.log('Hello PopoverContributionComponent Component');
    this.text = 'Hello World';
  }

}
