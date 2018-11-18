import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the PreviewModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preview-modal',
  templateUrl: 'preview-modal.html',
})
export class PreviewModalPage {
  contribution:any;
  modalArray: any;
  first: any;
  current: any = 0;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public domSanitizer: DomSanitizer,
    public viewCtrl: ViewController
  ) {
    this.modalArray = [".text-modal"];
    this.contribution=navParams.get('contributionFormData')
console.log("***********",this.contribution);

    if (this.contribution.audiopath) {
      this.modalArray.push(".modal-audio-view")
    }
    if (this.contribution.videos) {
      this.modalArray.push(".modal-video-view")
      } 
      if (this.contribution.images[0]) {
        if (this.contribution.images[0].imagestatus) {
          this.modalArray.push(".modal-gallery-view")
        }
      }
    if (this.contribution.website) {
      if(this.contribution.website[0].websitetitle) {
        this.modalArray.push(".modal-links-view")
      }
    }
    this.contribution.ModalValue = this.modalArray;
  }
  moveForward(modalArray) {
    this.modalArray = modalArray;
    if (!this.first) {
      this.current++
    } else {
      this.first = false
    }
    if (this.current == this.modalArray.length) {
      this.current = 0
    }
    $(this.modalArray[this.current]).show();

    for (var i = 0; i < this.modalArray.length; i++) {
      if (this.current == i) {
      } else {
        $(this.modalArray[i]).hide();
      }
    }
  }

  moveBackward(modalArray) {
    this.modalArray = modalArray;
    this.current--
      if (this.current == -1) {
        this.current = this.modalArray.length - 1;
      }
    $(modalArray[this.current]).show();

    for (var i = 0; i < this.modalArray.length; i++) {
      if (this.current == i) {
      } else {
        $(this.modalArray[i]).hide();
      }
    }
  }
  openFold(type) {
    if(type =='video') {
      $('.text-modal').hide();
      $('.modal-video-view').show();
      $('.modal-audio-view').hide();
      $('.modal-gallery-view').hide();
      $('.modal-links-view').hide();
    }
    if(type == 'audio') {
      $('.text-modal').hide();
      $('.modal-video-view').hide();
      $('.modal-audio-view').show();
      $('.modal-gallery-view').hide();
      $('.modal-links-view').hide();
    }
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
