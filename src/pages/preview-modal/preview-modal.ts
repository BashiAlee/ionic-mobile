import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';
declare var $: any;

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
  type: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public domSanitizer: DomSanitizer,
    public viewCtrl: ViewController
  ) {
    this.modalArray = [".text-modal"];
    this.contribution=navParams.get('contributionFormData');
   this.type =navParams.get('type');

    this.contribution  = _.mapKeys(this.contribution, function (v, k) { return k.toLowerCase(); });

  

    if (this.contribution.audiopath) {
      this.modalArray.push(".modal-audio-view")
      if(this.contribution.audiopath.includes('amazonaws')) {
        this.contribution.audiopath = this.contribution.audiopath;
      } else {
        this.contribution.audiopath = 'https://s3.us-east-2.amazonaws.com/climbmentors/'+this.contribution.audiopath;
      }
     }
    if (this.contribution.videos) {
      this.modalArray.push(".modal-video-view")
      var videoClient = this.contribution.videos.search("you");
      if(videoClient>-1) {
       let id = this.getYouTubeId(this.contribution.videos);
       let videoSrc = id
      this.contribution.videos = videoSrc;
      } else {
       let id = this.GetVimeoIDbyUrl(this.contribution.videos);
       let videoSrc = id
       this.contribution.videos = videoSrc;
      }

      } 
      if (this.contribution.images && this.contribution.images[0]) {
        if (this.contribution.images[0].imagestatus || this.contribution.images[0].Imagestatus) {
          this.modalArray.push(".modal-gallery-view")
        }
      }
    if (this.contribution.website) {
      if(this.contribution.website[0].websitetitle) {
        this.modalArray.push(".modal-links-view")
      }
    }
   


    this.contribution.ModalValue = this.modalArray;
    if(this.type) {
      this.openFold(this.type);
    }
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
      $( document ).ready(function() {
        $('.text-modal').hide();
        $('.modal-video-view').show();
        $('.modal-audio-view').hide();
        $('.modal-gallery-view').hide();
        $('.modal-links-view').hide();
    });

      var index = this.contribution.ModalValue.findIndex(obj => obj === '.modal-video-view');
      this.current = index;
    }
    if(type == 'audio') {
      $( document ).ready(function() {
        $('.text-modal').hide();
        $('.modal-video-view').hide();
        $('.modal-audio-view').show();
        $('.modal-gallery-view').hide();
        $('.modal-links-view').hide();
    });

      var index = this.contribution.ModalValue.findIndex(obj => obj === '.modal-audio-view');
      this.current = index;
    }

    if(type == 'image') {
      $( document ).ready(function() {
        $('.text-modal').hide();
        $('.modal-video-view').hide();
        $('.modal-audio-view').hide();
        $('.modal-gallery-view').show();
        $('.modal-links-view').hide();
    });

      var index = this.contribution.ModalValue.findIndex(obj => obj === '.modal-gallery-view');
      this.current = index;
    }
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  getYouTubeId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
      return "https://www.youtube.com/embed/"+match[2];
    } else {
      return 'error';
    }
  }
  GetVimeoIDbyUrl(url) {
    var id = false;
    $.ajax({
      url: 'https://vimeo.com/api/oembed.json?url='+url,
      async: false,
      success: function(response) {
        if(response.video_id) {
          id = response.video_id;
        }
      }
    });
    return "https://player.vimeo.com/video/"+id;
  }
}
