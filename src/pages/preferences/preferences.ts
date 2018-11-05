import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PreferencesProvider } from '../../providers/preferences/preferences';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AboutMePage } from '../user/about-me/about-me';

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
  subCat:any;
  user:any;

  public userPreferences:any=[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public preferences: PreferencesProvider,
    public authService: AuthenticationProvider,
  
  ) {
    // this.preferencesDataPost = this.formBuilder.group({
    //   userid: [''],
    //   userprefere: [],
    // })
  }
    UserPreference
  ionViewDidLoad() {
    this.getPreferences()
    this.user = this.authService.getCurrentUser();

  }

  getPreferences(){
    this.loading = true;
    this.preferences.getAllPreferences()
    .subscribe( data => {
      if(data.status) {
        this.preferencesData = data.data;
        console.log("this is preferences",this.preferencesData)
        this.loading = false;
      } else if (!data.status) {
        this.preferencesData = null;
        this.loading = false;
      }
    })
  }
  change($event) {
    this.subCat=$event.SubCategories
  }

  change1($event){
    for(let i=0;i<$event.length;i++){
      this.userPreferences.push($event[i]);
    }
    console.log('this.userPreferences',this.userPreferences);

    
  }
  savePreferences(){
    this.preferencesDataPost={
      userid: this.user._id,
      userpreferences: this.userPreferences
      }
      this.loading = true;
      this.preferences.addUserPreferences(this.preferencesDataPost)
      .subscribe( data => {
        if(data.status) {
          // this.preferencesData = data.data;
          console.log("this is preferences",this.preferencesData)
          this.loading = false;
          this.navCtrl.setRoot(AboutMePage)

          
        } else if (!data.status) {
          // this.preferencesData = null;
          this.loading = false;
        }
      })
  }
}
