import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, LoadingController } from 'ionic-angular';
import { PopoverController,ModalController } from 'ionic-angular';
import { UserPopoverComponent } from '../../components/user-popover/user-popover';
import { MessagePopoverComponent } from '../../components/message-popover/message-popover';
import { NotificationPopoverComponent } from '../../components/notification-popover/notification-popover';
import { FormBuilder, FormGroup, Validators,FormControl, FormArray } from '@angular/forms';

import { Content } from 'ionic-angular';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { UserProvider } from '../../providers/user/user';
import { ContributionsProvider } from '../../providers/contributions/contributions';
import { PreferencesProvider } from '../../providers/preferences/preferences';
import { MyContributionPage } from '../../pages/my-contribution/my-contribution';
import { Crop } from '@ionic-native/crop';
import { Base64 } from '@ionic-native/base64';
import { DomSanitizer } from '@angular/platform-browser';
import { PreviewModalPage } from '../../pages/preview-modal/preview-modal';
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
  providers: [Camera, AuthenticationProvider, UserProvider, ContributionsProvider,Base64]
})


export class CreateContributionPage {
  contribution_action: any;
  contributionForm: FormGroup;
  contributionData:any=[];
  coverImage: any;
  loading: any;
  loaders: any={};
  user: any;
  contributionId:any;
  isUploaded:any={};
  imageStatus: any = [];
  preferencesData: any;
  slectedCategory:any=[];
  url: any = [];
  contributionTags: any = '';
  opts: Object = {
    charCounterCount: true,
    key: 'MC2C2D1B1lG4J4B16B7D3D6F4C2C3I3gC-21qwvilh1H3gjk==',
    placeholderText: 'Type your text here..',
    heightMin: 300,
    heightMax: 300,
    toolbarButtons: ['bold', 'italic', 'fontFamily', 'fontSize', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', '|', 'insertHR', 'selectAll','specialCharacters', 'clearFormatting', '|','html', '|', 'undo', 'redo'],
    toolbarButtonsXS: ['bold', 'italic', 'fontFamily', 'fontSize', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', '|', 'insertHR', 'selectAll','specialCharacters', 'clearFormatting', '|','html', '|', 'undo', 'redo'],
    toolbarButtonsSM: ['bold', 'italic', 'fontFamily', 'fontSize', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', '|', 'insertHR', 'selectAll','specialCharacters', 'clearFormatting', '|','html', '|', 'undo', 'redo'],
    toolbarButtonsMD: ['bold', 'italic', 'fontFamily', 'fontSize', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', '|', 'insertHR', 'selectAll','specialCharacters', 'clearFormatting', '|','html', '|', 'undo', 'redo']
  };
  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public authService: AuthenticationProvider,
    public preferences: PreferencesProvider,
    public userService: UserProvider,
    public camera: Camera,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public contributionService: ContributionsProvider,
    public popoverCtrl: PopoverController,
    private crop: Crop,
    private base64: Base64,
    private sanitizer: DomSanitizer
  ) { 
    this.contribution_action  = 'content';
    this.user = this.authService.getCurrentUser();
    this.contributionId = this.navParams.get('id')

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
  previous(){
    this.contribution_action='content';
  }
  goTo(){
    this.contribution_action='cover-image';
  }
  next(){
    this.contribution_action='submit';
  }
  openModal() {
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
    // loading.present();
    if(this.contributionForm.value.images) {
      const control = < FormArray > this.contributionForm.controls['images'];
      this.imageStatus.forEach(status => {
        const addrCtrl = this.formBuilder.group({
          imagestatus: [status.img],
          imagetitle: [status.title],
          imagedescription: [status.description]
        });
        control.push(addrCtrl);
     
      });
    }

    let modal = this.modalCtrl.create(PreviewModalPage,{contributionFormData: this.contributionForm.value});
    modal.present();
  }
  saveDraft(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    var tagsList = this.contributionTags;
    if (tagsList){
      var tagsList = this.contributionTags.split(',');
      const control1 = < FormArray > this.contributionForm.controls['tags'];
      tagsList.forEach(value => {
        const addrCtrl = this.formBuilder.group({
          tag: [value]
        });
        control1.push(addrCtrl);
      });
    }
    const control = < FormArray > this.contributionForm.controls['images'];
    if (this.imageStatus){
      this.imageStatus.forEach(status => {
        const addrCtrl = this.formBuilder.group({
          imagestatus: [status.img],
          imagetitle: [status.title],
          imagedescription: [status.description]
        });
        control.push(addrCtrl);
     
      });
    }
  
    this.contributionForm.patchValue({
      contributionstatus: "Draft" 
    });
    this.contributionService.createContribution(this.contributionForm.value)
    .subscribe( data => {
      loading.dismiss();
      let toast = this.toastCtrl.create({
        message: 'Contribution Created successfully',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      this.navCtrl.setRoot(MyContributionPage);

    });
  }
  ionViewDidLoad() {
    this.getPreferences()
    this.getContributionByContributionId(this.contributionId)
  }
  getContributionByContributionId(contributionId){
    this.loaders.detailLoader = true;
    this.contributionService.searchContributionByContributionId(contributionId)
    .subscribe( data => {
      if (data.status) {
        this.contributionForm.patchValue({
          useremail: data.data.UserEmail,
          title: data.data.Title,
          username: data.data.UserFullName,
          userid: data.data.UserID,
          userprofilepicture: data.data.UserProfilePicture,
          maincategory: data.data.MainCategory,
          subcategories: data.data.SubCategories,
          contributiontext: data.data.ContributionText,
          videos: data.data.Videos,
          contributionstatus: data.data.ContributionStatus,
          audiopath: data.data.AudioPath,
          adminstatus:data.data.AdminStatus,
          website: data.data.Website,
          coverpage: data.data.Coverpage,
        });
        this.coverImage = data.data.Coverpage;
        var d = data.data.Tags;
        d.forEach(tags => {
          if(tags.Tag) {
            this.contributionTags += tags.Tag+",";
          }
          
        });
        this.contributionTags = this.contributionTags.replace(/,\s*$/, "");
        var e= data.data.Images;
        e.forEach(imgs => {
            this.imageStatus.push({
              localImage: imgs.Imagestatus,
              title:  imgs.ImageTitle,
              description: imgs.ImageDescription
            })
        });
        this.category(this.contributionForm.value.maincategory);
        this.loaders.detailLoader = false;
      }
      else if (!data.status) {
        // this.preferencesData = null;
        this.loaders.detailLoader = false;
      }
    })
  }
  updateCotribution(){
    this.contributionForm.addControl('_id', new FormControl(this.contributionId,Validators.required));
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    var tagsList = this.contributionTags.split(',');

    const control1 = < FormArray > this.contributionForm.controls['tags'];
    tagsList.forEach(value => {
      const addrCtrl = this.formBuilder.group({
        tag: [value]
      });
      control1.push(addrCtrl);
    });
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
    this.contributionService.editContribution(this.contributionForm.value)
    .subscribe( data => {
      console.log(data)
      loading.dismiss();
      let toast = this.toastCtrl.create({
        message: 'Contribution Updated successfully',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      this.navCtrl.setRoot(MyContributionPage);
    });
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
  category(categorydata){
   this.slectedCategory =  this.preferencesData.filter(cat => cat.Category == categorydata)[0]
  
  }
  subCategory(subCategorydata){
    console.log(subCategorydata)
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
    this.loading= true;
    let options = {
      maximumImagesCount:1,//select number of image default is 15
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
      }
      this.camera.getPicture(options).then((result) => {
   
 
      this.loading = false;
      this.crop.crop(result, {quality: 100})
      .then(newImage => {
        this.base64.encodeFile(newImage).then((base64File: string) => {
          this.coverImage =  base64File
          this.uploadCroppedImage(this.coverImage)
        }, (err) => {
          console.log(err);
        });
        // console.log('new image path is: ' + newImage)
       },
          error => console.error('Error cropping image', error)
       );
      // this.uploadCroppedImage(this.coverImage)
    }, (err) => { });
  }

  openCamera() {
    this.loading= true;
    const options: CameraOptions = {
      quality: 100,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((result) => {
      this.loading = false;
      this.crop.crop(result, {quality: 100})
      .then(newImage => {
        this.base64.encodeFile(newImage).then((base64File: string) => {
          this.coverImage =  base64File
          this.uploadCroppedImage(this.coverImage)
        }, (err) => {
          console.log(err);
        });
        // console.log('new image path is: ' + newImage)
       },
          error => console.error('Error cropping image', error)
       );
      // this.uploadCroppedImage(this.coverImage)
    }, (err) => { });
    //   this.coverImage = 'data:image/jpeg;base64,' + imageData;
    //   this.loading = false;
    //   this.uploadCroppedImage(this.coverImage)
    //  }, (err) => {

    //   // Handle error
    //  });
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
    this.isUploaded.audioError=false;
    this.isUploaded.audio=false;
    this.loaders.audio=true;
    this.userService.uploadAudio(file)
    .subscribe(
      data => {
        if (data.status){
          this.contributionForm.patchValue({
            audiopath: data.status
          });
          this.loaders.audio=false;
          this.isUploaded.audio=true;
        }else{
          this.isUploaded.audioError=true;
          this.loaders.audio=false;
      }
      },
      error => {
        this.isUploaded.audioError=true;
        this.loaders.audio=false;
      }
    );
  }

  uploadContributionImage(file) {
    this.loaders.img=true;
    this.isUploaded.imgError=false
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
          this.loaders.img=false;
          reader.readAsDataURL(target.files[0]);
        }
      },
      error => {
        this.isUploaded.imgError=true
        this.loaders.img=false;
      }
    );
  }

  saveContribution() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    var tagsList = this.contributionTags.split(',');

    const control1 = < FormArray > this.contributionForm.controls['tags'];
    tagsList.forEach(value => {
      const addrCtrl = this.formBuilder.group({
        tag: [value]
      });
      control1.push(addrCtrl);
    });
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
      loading.dismiss();
      let toast = this.toastCtrl.create({
        message: 'Contribution Created successfully',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      this.navCtrl.setRoot(MyContributionPage);

    });
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
      }else{
        this.isUploaded.error=true;
        this.coverImage= '';
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
