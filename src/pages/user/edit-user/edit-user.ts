import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastController } from 'ionic-angular';
import { environment as ENV } from '../../../../src/environments/environment'
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { UserProvider } from '../../../providers/user/user';
import { AboutMePage } from '../about-me/about-me';




/**
 * Generated class for the EditUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit-user.html',
  providers: [Camera, AuthenticationProvider]
})
export class EditUserPage {
  profileImage: any;
  user: any;
  editProfileForm: FormGroup;
  ageFilter: any;
  maxLimit: any;
  minLimit: any;
  just18Plus: any;
  doBoth: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    private domSanitizer: DomSanitizer,
    private authService: AuthenticationProvider,
    private formBuilder: FormBuilder,
    private userService: UserProvider,
    private toastCtrl: ToastController
  ) {
    if(this.authService.isLoggedIn) {
      this.user = this.authService.getCurrentUser();
      if(this.user.Age > 18) {
        this.ageFilter = '18+';
        this.maxLimit = 1000000;
        this.minLimit = 18;
        this.just18Plus = true; 
       }
       if(this.user.Age < 18) {
        this.ageFilter = 'under18';
        this.maxLimit = 17;
        this.minLimit = 1;
        this.doBoth = true;
       }
    }
    this.editProfileForm = this.formBuilder.group({
        _id: new FormControl(this.user._id),
        aboutMe: new FormControl(),
        companyName: new FormControl(this.user.CompanyName,Validators.required),
        fullName: new FormControl(this.user.FullName,Validators.required),
        email: new FormControl(this.user.Email),
        Password: new FormControl('',[Validators.minLength(8)]),
        address: new FormControl(this.user.Address),
        city: new FormControl(this.user.City),
        zipcode: new FormControl(this.user.ZipCode,Validators.required),
        bio: new FormControl(this.user.Bio,Validators.required),
        age: new FormControl(this.user.Age,[Validators.required,Validators.max(this.maxLimit), Validators.min(this.minLimit)]),
        status: new FormControl(this.user.Status),
        parentstatus: new FormControl(this.user.ParentStatus),
        profilepicture: new FormControl(this.user.ProfilePicture,Validators.required),
        parentEmail: new FormControl(this.user.ParentEmail),
        parentPhone: new FormControl(this.user.ParentPhone)
    })

    this.profileImage = this.user.ProfilePicture;
  }

  ionViewDidLoad() {
    console.log('DDDD', ENV)
    console.log('ionViewDidLoad EditUserPage');

  }
  ionViewCanEnter(){
    if(this.authService.isLoggedIn()) {
    }
   }

  openCamera() {
    
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.profileImage = 'data:image/jpeg;base64,' + imageData;
      this.uploadCroppedImage(this.profileImage)
     }, (err) => {

      // Handle error
     });
  }

  chooseFromGallery() {
    let options = {
      maximumImagesCount:1,//select number of image default is 15
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
      }
    this.camera.getPicture(options).then((result) => {
      this.profileImage = 'data:image/jpeg;base64,' + result;
      this.uploadCroppedImage(this.profileImage)
    }, (err) => { });
  }
  openActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Choose',
      buttons: [
        {
          text: 'Choose Image from Gallery',
          handler: () => {
            this.chooseFromGallery();
          }
        },{
          text: 'Open Camera',
          handler: () => {
            this.openCamera();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  checkType() {
    if(this.ageFilter== 'under18') {

      this.maxLimit = 17;
      this.minLimit = 1;
      this.editProfileForm.controls['age'].setValidators([Validators.max(this.maxLimit), Validators.min(this.minLimit)])
        this.editProfileForm.addControl('parentEmail', new FormControl(this.user.ParentEmail,Validators.required));
        this.editProfileForm.addControl('parentPhone', new FormControl(this.user.ParentPhone,Validators.required));  
      }
      if(this.ageFilter == '18+'){
        
        this.maxLimit = 1000000;
        this.minLimit = 18;
        this.editProfileForm.controls['age'].setValidators([Validators.max(this.maxLimit), Validators.min(this.minLimit)])
        this.editProfileForm.removeControl('parentEmail');
        this.editProfileForm.removeControl('parentPhone')
      }
  }

  uploadCroppedImage(base64) {
    fetch(base64)
    .then(res => res.blob())
    .then(blob => {
      var file1 = new File([blob], 'test');

      this.userService.uploadCroppedImage(file1, 'test')
        .subscribe(data => {
          if (data.status) {
            this.editProfileForm.patchValue(
              {
                profilepicture: data.status
              }
            );
          }

        })
    })
  }

  updateProfileInfo() {
    
 
    this.userService.updateProfile(this.editProfileForm.value)
    .subscribe(
      data =>{
        if(data.status) {
          localStorage.setItem('user', JSON.stringify(data.data))
          let toast = this.toastCtrl.create({
            message: 'Profile Updated successfully',
            duration: 3000,
            position: 'bottom'
          });
        
          toast.present();

          this.navCtrl.setRoot(AboutMePage)
         
        } else if(!data.status){
          let toast = this.toastCtrl.create({
            message: 'Profile not updated',
            duration: 3000,
            position: 'bottom'
          });
        
          toast.present();
        }
      }
    );
  }
  
  
}
