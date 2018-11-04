import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PreferencesProvider } from '../../providers/preferences/preferences';

/**
 * Generated class for the PreferencesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preferences',
  templateUrl: 'preferences.html',
})
export class PreferencesPage {
  preferencesData: any;
  loading: any;
  subCat:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public preferences: PreferencesProvider,
  
  ) {
  }
  ionViewDidLoad() {
    this.getPreferences()
  }

  getPreferences(){
    this.loading = true;
    this.preferences.getAllPreferences()
    .subscribe( data => {
      if(data.status) {
        this.preferencesData = data.data;
        // console.log("this is preferences",this.preferencesData)
        this.loading = false;
      } else if (!data.status) {
        this.preferencesData = null;
        this.loading = false;
      }
    })
  }
  change($event) {
    // console.log('Selected', $event);
    this.subCat=$event.SubCategories
    console.log('sub cate',this.subCat);

    // if($event==this.preferencesData.Category){
    //   this.subCat=this.preferencesData.Category
    //   console.log("is subcatigkqss",this.subCat)
    // }
  }
}
