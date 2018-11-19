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
// import { File } from '@ionic-native/file';
// import { Base64 } from '@ionic-native/base64';
import { HttpClient } from '@angular/common/http';
import { PreferencesPage } from '../../../pages/preferences/preferences';
import { AlertController } from 'ionic-angular';
import { LoadingController} from 'ionic-angular';
import { HomePage } from '../../../pages/home/home';

declare var window: any


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
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private httpClient: HttpClient,
    public alertCtrl: AlertController,

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

       console.log("DDD", this.maxLimit, this.minLimit)
    }
    this.editProfileForm = this.formBuilder.group({
        _id: new FormControl(this.user._id),
        aboutMe: new FormControl(''),
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

  }
  ionViewCanEnter(){
    if(this.authService.isLoggedIn()) {
    }
   }

  openCamera() {
    
    const options: CameraOptions = {
      quality: 70,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
  
       this.camera.getPicture(options).then((imageData) => {
       let loader =  this.loadingCtrl.create({
        content: 'Please wait...',
      });
      loader.present();
      this.profileImage = 'data:image/jpeg;base64,' + imageData;
      loader.dismiss();
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
      let loader =  this.loadingCtrl.create({
        content: 'Please wait...',
      });
      loader.present();
      this.profileImage = 'data:image/jpeg;base64,' + result;
      this.uploadCroppedImage(this.profileImage)
      loader.dismiss();
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
            // this.uploadCroppedImage("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAHgAeADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDh6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKSr1ppstwu9z5aHpkcn8KtmwsI+JJQD7vikdEcNOUeZ2S8zGpa130uCVM28uD653Cs25tpLZ9rjjsfWgVTDzgubp3RFRRRTMAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBK0bXSnkXfM2xfTHNM0mATXRZhlUGfx7U/VLx3laBSQi8H3NI6qVOEYOrUV+yLAsLDO3zRn03ioLnSWRS8LbwP4cc1m1oaXeNHKsLklG4GexoKjVpVHyzgkn1WlihV7SrUTzGRxlE7epo1eBYpw6jAkyauaaNmls46ncf8/lQOjQtX5Ja2K+o37mQwwkqq8EjqazaM0UHNVqSqScmOikeJt0bFWHcVswSJqVmySABx1+vY1iVf0VyLtl7MtBphanLUUej0ZRdDG5RuoODSVa1NQL+UD1B/SqlBlUjyza7MWiiimQFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBqaEf9cO/y/wBaoXalbqQHrk0+wufs1wHP3Tw30rQvrEXX7+3YEkc+jUjtgnWockd0/wADH7VJbgtcRhepYY/On/YbrOPJatGwsPs37+4I3AcDstBlTw1ScrNWQzXMYhHf5v6U/SWEtjJETyCR+B/yaoX9z9puCyn5BwtNsro2s4bqp4Ye1Bq66WI5+n9IhdGjco4wRwaStq6s471PPgYbj39f/r1mmwugSDCxx6UGdXDTi7xV09ralatPRIiZJJSOANo+tRQaXcSN848te5P+FXbq4isbbyIMB8YA7j3oNKFFwftamiX4mbfuJL2Vh0ziq9JS0HJOXNJy7hRRRTJCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooASp7e7ntv8AVv8AL/dPIqGikNNp3Rof2xPt+5Hn1wf8aqz3c9zxI/H90cCoKKC5VZyVm2LRRRTMySC4mgYmJyvqOxq4usTgcohPrzWdS0i4VJw+F2LsuqXMgwpVB/sjmqRJJJJJJ6k0UUClOU/idwooopkhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH/9k=")
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
    this.uploadBase64(base64, 'image.png');
  }
//   uploadCroppedImage(base64) {
//     const bytes: string =  atob(base64.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
//     const byteNumbers = new Array(bytes.length);
//     for (let i = 0; i < bytes.length; i++) {
//       byteNumbers[i] = bytes.charCodeAt(i);
//     }
//     const byteArray = new Uint8Array(byteNumbers);

//     const blob: Blob = new Blob([byteArray], { type: 'image/jpeg' });
//     console.log("blob", blob)
//     console.log("blob blob blob  blob", blob)
//     // var file1 = new File([blob], 'file.png', {type: 'image/jpeg', lastModified: Date.now()});
//     // console.log("DDDDDDD", file1)
// // this.file.writeFile(this.file.dataDirectory, 'file.png', blob).then((result) => {
// //     console.log("EEEE", result)
// // }).catch((err) => {
  
// // });
//     // fetch(base64).then((base) => {
//     //   console.log("DDD", base)
//     // })
//     //  console.log("DDD", base64)

//     // this.base64.encodeFile(base64).then((base64File) => {
//     //   console.log("DFFF", base64File)
//     // }, (err) => {
//     //   console.log(err);
//     // });

//     // let imgBlob = new Blob([base64], { type: 'image/jpeg' });
//     // var contentType = '';
//     // var sliceSize = 512;

//     // var base64 = base64.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');

//     // let byteCharacters = atob(base64);
//     // let byteArrays = [];

//     // for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//     //   let slice = byteCharacters.slice(offset, offset + sliceSize);

//     //   let byteNumbers = new Array(slice.length);
//     //   for (let i = 0; i < slice.length; i++) {
//     //       byteNumbers[i] = slice.charCodeAt(i);
//     //   }

//     //   let byteArray = new Uint8Array(byteNumbers);
//     //   byteArrays.push(byteArray);
//     // }

//     // let blob = new Blob(byteArrays, {type: contentType});
//     // console.log("DD", contentType)
//           // var file1 = new File([imgBlob], 'test.jpg');

//       // this.userService.uploadCroppedImage(file1, 'test.jpg')
//       //   .subscribe(data => {
//       //     if (data.status) {
//       //       this.editProfileForm.patchValue(
//       //         {
//       //           profilepicture: data.status
//       //         }
//       //       );
//       //     }

//       //   })
//   //   window.resolveLocalFileSystemURL(base64, function(fileEntry) {
//   //     fileEntry.file(function (file) {
//   //       var reader = new FileReader();

//   //       reader.onloadend = function (e) {
//   //         console.log("file loadend");
//   //         console.log(e);
//   //   //Here I want to get the FileEntry and call the upload function
//   //       };
//   //       reader.readAsArrayBuffer(file);                      
//   //     });
//   // }, function(err) {
//   //     console.log("failed to read the file" + err);
//   //   });
  
  

//   // window.resolveLocalFileSystemURL(base64, (fileEntry) => {

//   //   fileEntry.file((resFile) => {

//   //     var reader = new FileReader();
//   //     reader.onloadend = (evt: any) => {
//   //       console.log('++++++++ ', evt)
//   //       // var imgBlob: any = new Blob([], { type: 'image/jpeg' });
//   //       // var file1 = new File(imgBlob, imgBlob.name);
//   //       this.userService.uploadCroppedImage(evt.target.result,'sample.jpg')
//   //       .subscribe( data => {
//   //         console.log("FFFF", data)
//   //       }) 
//   //     };

//   //     reader.onerror = (e) => {
//   //       console.log('Failed file read: ' + e.toString());
       
//   //     };

//   //     reader.readAsArrayBuffer(resFile);
//   //   });
//   // });
// //   window.resolveLocalFileSystemURL(base64, function(fileEntry) {
// //     var _this = this;
// //     fileEntry.file(function (file) {
// //       var reader = new FileReader();

// //       reader.onloadend = function (e) {
       
// //         console.log("file loadend");
// //         console.log("FFF", e);
// //         _this.userService.uploadCroppedImage(e.target.result, 'test.jpg')
// //   //Here I want to get the FileEntry and call the upload function
// //       };
// //       reader.readAsArrayBuffer(file);                      
// //     });
// // }, function(err) {
// //     console.log("failed to read the file" + err);
// //   });


//     // fetch(base64)
//     // .then(res => res.blob())
//     // .then(blob => {
//     //   var file1 = new File([blob], 'test.jpg');

//     //   this.userService.uploadCroppedImage(file1, 'test.jpg')
//     //     .subscribe(data => {
//     //       if (data.status) {
//     //         this.editProfileForm.patchValue(
//     //           {
//     //             profilepicture: data.status
//     //           }
//     //         );
//     //       }

//     //     })
//     // })
//   }
  

  updateProfileInfo() {
    console.log("asdasdds",this.editProfileForm.value)
    // return;
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

          // this.navCtrl.setRoot(AboutMePage)
          this.navCtrl.setRoot(PreferencesPage)
         
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
  uploadBase64(base64: string, filename: string) {
    const blob = this.convertBase64ToBlob(base64);
    const fd = new FormData();
  
    fd.append('file', blob, filename);
    this.userService.uploadImage(fd).subscribe(data => {

    if (data.status) {
            this.editProfileForm.patchValue(
              {
                profilepicture: data.status
              }
            );
          }
    })
  }

  private convertBase64ToBlob(base64: string) {
    const info = this.getInfoFromBase64(base64);
    const sliceSize = 512;
    const byteCharacters = window.atob(info.rawBase64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      byteArrays.push(new Uint8Array(byteNumbers));
    }

    return new Blob(byteArrays, { type: info.mime });
  }

  private getInfoFromBase64(base64: string) {
    const meta = base64.split(',')[0];
    const rawBase64 = base64.split(',')[1].replace(/\s/g, '');
    const mime = /:([^;]+);/.exec(meta)[1];
    const extension = /\/([^;]+);/.exec(meta)[1];

    return {
      mime,
      extension,
      meta,
      rawBase64
    };
  }
  
  showErrorAlert(message) {
    const alert = this.alertCtrl.create({
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage)
  }
}
