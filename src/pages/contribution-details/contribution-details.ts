import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ContributionDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contribution-details',
  templateUrl: 'contribution-details.html',
})

export class ContributionDetailsPage {
  options = {
    slidesPerView: 3
  }
  items_a = [
    { gameTitle: 'Title1', gameImage: 'http://via.placeholder.com/200x200' },
    { gameTitle: 'Title2', gameImage: 'http://via.placeholder.com/200x200' },
    { gameTitle: 'Title3', gameImage: 'http://via.placeholder.com/200x200' },
    { gameTitle: 'Title4', gameImage: 'http://via.placeholder.com/200x200' },
    { gameTitle: 'Title5', gameImage: 'http://via.placeholder.com/200x200' },
    { gameTitle: 'Title6', gameImage: 'http://via.placeholder.com/200x200' },
    { gameTitle: 'Title7', gameImage: 'http://via.placeholder.com/200x200' },
    { gameTitle: 'Title8', gameImage: 'http://via.placeholder.com/200x200' },
    { gameTitle: 'Title9', gameImage: 'http://via.placeholder.com/200x200' }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContributionDetailsPage');
  }

}
