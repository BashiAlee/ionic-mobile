import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PreferencesProvider } from '../../providers/preferences/preferences';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AboutMePage } from '../user/about-me/about-me';
import { _,uniqBy,uniq} from 'lodash';
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
  preferencesDataPost: any=[];
  loading: any;
  subCategory:any;
  user:any;
  userPreferences:any=[];
  selectedPreferences:any=[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public preferences: PreferencesProvider,
    public authService: AuthenticationProvider,
  
  ) {
  }
  ionViewDidLoad() {
    this.getPreferences()
    this.user = this.authService.getCurrentUser();
    var data = {
      userid:this.user._id
    }
    this.getUserPreferences(data)
  }
  change(val) {
    // console.log("DFDDD", val, this.preferencesData)

    this.subCategory = this.preferencesData.filter(cat => cat.Category == val)[0];
    this.subCategory = this.subCategory.SubCategories;
  }

  selectSubCategory(subcat) {
    console.log("DDDD", subcat)
    this.selectedPreferences= [];
    if(subcat && subcat.length) {
      subcat.forEach(subcat => {
        this.userPreferences.push({SubCategory: subcat})
      });
    }

    // console.log(this.selectedPreferences)
    // console.log(this.userPreferences)
    // this.selectedPreferences=this.selectedPreferences.concat(this.userPreferences)
    // // this.preferencesDataPost = uniqBy(this.selectedPreferences)
    // uniqBy(this.selectedPreferences, function (e) {
    // console.log(e)
    // return e;

    // });
    // this.preferencesDataPost=this.preferencesDataPost.concat(this.userPreferences)
    // this.preferencesDataPost = uniqWith(this.preferencesDataPost,this.userPreferences)
  }
  getUserPreferences(id){
    this.loading = true;
    this.preferences.getUserPreferences(id)
    .subscribe( data => {
      if(data.status) {
        this.userPreferences = data.data.UserPreferences;
        this.loading = false;
      } else if (!data.status) {
        this.userPreferences = null;
        this.loading = false;
      }
    })
  }

  getPreferences(){
    this.loading = true;
    this.preferences.getAllPreferences()
    .subscribe( data => {
      if(data.status) {
        this.preferencesData = data.data;
        this.loading = false;
      } else if (!data.status) {
        this.preferencesData = null;
        this.loading = false;
      }
    })
  }
  removePreference(index) {
    this.userPreferences.splice(index, 1);
  }
  savePreferences(){
    var data ={
      userid: this.user._id,
      userpreferences:this.userPreferences
      }
      this.loading = true;
      this.preferences.addUserPreferences(data)
      .subscribe( data => {
        console.log(data)
        if(data.status) {
          this.loading = false;
          this.navCtrl.setRoot(AboutMePage)
        } else if (!data.status) {
          this.preferencesData = null;
          this.loading = false;
        }
      })
  }
}
