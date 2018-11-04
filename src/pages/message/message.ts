import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { DomSanitizer } from '@angular/platform-browser';
import { MessagesProvider } from '../../providers/messages/messages';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
  providers: [MessagesProvider, AuthenticationProvider]

})
export class MessagePage {
  id: any;
  messages: any;
  loading: any;
  user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: MessagesProvider,
    public domSanitizer: DomSanitizer,
    public authService: AuthenticationProvider
  ) {
    this.user = this.authService.getCurrentUser();
    this.id = this.navParams.get('messageDetail')
  }

  ionViewDidLoad() {
    this.getMessages(this.id)
  }

  getMessages(id) {
    this.loading = true;
    this.userService.getUserMessages(id)
      .subscribe(data => {
        if (data.status) {
          this.messages = data.data.Messages;
          this.loading = false;
        } else if (!data.status) {
          this.messages = null;
          this.loading = false;
        }
      })
  }
  sendMessage(id) {
    this.loading = true;
    this.userService.sendUserMessages(id)
      .subscribe(data => {
        if (data.status) {
          this.messages = data.data;
          this.loading = false;
        } else if (!data.status) {
          this.messages = null;
          this.loading = false;
        }
      })
  }
}
