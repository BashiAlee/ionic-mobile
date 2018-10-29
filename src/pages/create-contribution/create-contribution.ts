import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { UserPopoverComponent } from '../../components/user-popover/user-popover';
import { MessagePopoverComponent } from '../../components/message-popover/message-popover';
import { NotificationPopoverComponent } from '../../components/notification-popover/notification-popover';
import { FormBuilder, FormGroup, Validators,FormControl, FormArray } from '@angular/forms';

import { Content } from 'ionic-angular';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { UserProvider } from '../../providers/user/user';
import { ContributionsProvider } from '../../providers/contributions/contributions';
/**
 * Generated class for the CreateContributionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-contribution',
  templateUrl: 'create-contribution.html',
  providers: [Camera, AuthenticationProvider, UserProvider, ContributionsProvider]
})


export class CreateContributionPage {
  contribution_action: any;
  contributionForm: FormGroup;
  coverImage: any;
  user: any;
  imageStatus: any = [];
  url: any = [];
  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public authService: AuthenticationProvider,
    public userService: UserProvider,
    public camera: Camera,
    private toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public contributionService: ContributionsProvider,
    public popoverCtrl: PopoverController) { 
      this.contribution_action  = 'content';
      this.user = this.authService.getCurrentUser();
      this.contributionForm = this.formBuilder.group({
        useremail: new FormControl(this.user.Email),
        title: new FormControl('', Validators.required),
        username: new FormControl(this.user.FullName),
        userid: new FormControl(this.user._id),
        userprofilepicture: new FormControl(this.user.ProfilePicture),
        maincategory: new FormControl(),
        subcategories: new FormControl(),
        contributiontext: new FormControl('', Validators.required),
        videos: new FormControl(),
        contributionstatus: new FormControl('', Validators.required),
        audiopath: new FormControl(),
        adminstatus: new FormControl(0),
        images: this.formBuilder.array([]),
  
        website: this.formBuilder.array([
          this.formBuilder.group({
            websiteurl: new FormControl(''),
            websitetitle: new FormControl('')
          })
        ]),
        coverpage: new FormControl('', Validators.required),
        contributiontype: new FormControl('contribution'),
        tags: this.formBuilder.array([

        ]),
      });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateContributionPage');
  }
  messagePopover(myEvent) {
    let popover = this.popoverCtrl.create(MessagePopoverComponent);
    popover.present({
      ev: myEvent
    });
  }

  scroll(elementId) {
    var x=document.getElementById(elementId)
    if(x.style.display === 'none'){
      x.style.setProperty("display", "block", "important")
      let y = document.getElementById(elementId).offsetTop;
      this.content.scrollTo(0, y, 500);
    }else{
      x.style.setProperty("display", "none", "important")

    }
  }
  notificationPopover(myEvent) {
    let popover = this.popoverCtrl.create(NotificationPopoverComponent);
    popover.present({
      ev: myEvent
    });
  }
  userPopover(myEvent) {
    let popover = this.popoverCtrl.create(UserPopoverComponent);
    popover.present({
      ev: myEvent
    });
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

  chooseFromGallery() {
    let options = {
      maximumImagesCount:1,//select number of image default is 15
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
      }
    this.camera.getPicture(options).then((result) => {
   
      this.coverImage = 'data:image/jpeg;base64,' + result;

      this.uploadCroppedImage(this.coverImage)
    }, (err) => { });
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {

      this.coverImage = 'data:image/jpeg;base64,' + imageData;
    
      this.uploadCroppedImage(this.coverImage)
     }, (err) => {

      // Handle error
     });
  }

  addNewUrl() {
    const control = < FormArray > this.contributionForm.controls['website'];
    const addrCtrl = this.formBuilder.group({
      websiteurl: [''],
      websitetitle: ['']
    });
    control.push(addrCtrl);
  }
  uploadAudio(file) {
    
    var FileSize = file.srcElement.files[0].size / 1024 / 1024; // in MB
    if (FileSize > 20) {
        // this.messages.maxSize = true;
       // $(file).val(''); //for clearing with Jquery
    } else {
      // this.messages.maxSize = false;
      // this.showUploader = true;
      this.userService.uploadAudio(file)
        .subscribe(
          data => {
            this.contributionForm.patchValue({
              audiopath: data.status
            });
            // this.sucessUpload = true;
            // this.showUploader = false;
  
          },
          error => {});
    }
  }

  uploadContributionImage(file) {
    // this.messages.uploadImageLoader = true;
    var target = file.target || file.srcElement

    this.userService.uploadAudio(file)
      .subscribe(
        data => {
        
          if (target.files && target.files[0]) {
            var reader = new FileReader();

            reader.onload = (event: any) => {
              // this.url = event.target.result;
              this.imageStatus.push({title: '',description:'', img:'https://s3.us-east-2.amazonaws.com/climbmentors/'+data.status, localImage: event.target.result})
              // this.url.push({title: '',description:'',img:event.target.result});
            }
            // this.messages.uploadImageLoader = false;
            reader.readAsDataURL(target.files[0]);
            console.log("DD", this.imageStatus)
          }

        },
        error => {
          // this.messages.uploadImageLoader = false;
        });

  }

  saveContribution() {

    const control = < FormArray > this.contributionForm.controls['images'];
    this.imageStatus.forEach(status => {
      const addrCtrl = this.formBuilder.group({
        imagestatus: [status.img],
        imagetitle: [status.title],
        imagedescription: [status.description]
      });
      control.push(addrCtrl);
   
    });
    this.contributionForm.patchValue({
      contributionstatus: "Publish" 
    });

    this.contributionService.createContribution(this.contributionForm.value)
    .subscribe( data => {
      let toast = this.toastCtrl.create({
        message: 'Contribution Created successfully',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    });
    console.log("FFF", this.contributionForm.value)

    
  }

  removeImage(index) {
    this.imageStatus.splice(index, 1);
  }
  uploadCroppedImage(base64) {
    this.uploadBase64(base64, 'image.png');
  }

  uploadBase64(base64: string, filename: string) {
    const blob = this.convertBase64ToBlob(base64);
    const fd = new FormData();
    fd.append('file', blob, filename);
    this.userService.uploadImage(fd).subscribe(data => {
    if (data.status) {
            this.contributionForm.patchValue(
              {
                coverpage: data.status
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
}
