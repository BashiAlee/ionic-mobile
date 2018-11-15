import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PreferencesProvider } from '../../providers/preferences/preferences';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserProfilePage } from '../../pages/user-profile/user-profile';
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
  loader: any;
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
    this.loader= true;
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
    console.log("FFFFF", this.userPreferences)
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
    this.preferences.getUserPreferences(id)
    .subscribe( data => {
      if(data.status) {
        this.userPreferences = data.data.UserPreferences;
        this.loader = false;
  } else if (!data.status) {
        this.userPreferences = [];
        this.loader = false;
      }
    })
  }

  getPreferences(){
    this.loader = true;
    this.preferences.getAllPreferences()
    .subscribe( data => {
      if(data.status) {
        this.preferencesData = data.data;
        this.loader = false;
      } else if (!data.status) {
        this.preferencesData = null;
        this.loader = false;
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
      this.loader = true;
      this.preferences.addUserPreferences(data)
      .subscribe( data => {
        if(data.status) {
          this.loader = false;
          this.navCtrl.setRoot(UserProfilePage,{id: this.user._id})
        } else if (!data.status) {
          this.navCtrl.setRoot(UserProfilePage,{id: this.user._id})
          this.preferencesData = null;
          this.loader = false;
        }
      })
  }
}
