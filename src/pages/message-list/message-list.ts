import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController,App } from 'ionic-angular';
import { MessagesProvider } from '../../providers/messages/messages';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import {MessagePage} from '../../pages/message/message';
import {ChatPage} from '../../pages/chat/chat';
/**
 * Generated class for the MessageListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-list',
  templateUrl: 'message-list.html',
  providers: [MessagesProvider, AuthenticationProvider]
})
export class MessageListPage {
  localData: any;
  loading: any;
  user: any;
  userMessageNotication: any = [];
  constructor(
    public viewCtrl: ViewController,
    public messageService: MessagesProvider,
    public authService: AuthenticationProvider,
    public navCtrl: NavController, 
    public appCtrl: App
  ) {
    this.user = this.authService.getCurrentUser();
    if(this.user._id) {
      this.getAllMessages(this.user._id);
    }
  }
  close() {
    this.viewCtrl.dismiss();
  }


  getAllMessages(data) {
    this.loading = true;
    var id = {user1id: data}
    this.messageService.getAllMessagesDetails(id)
    .subscribe(
      data => {
        if(data.status) {
          this.userMessageNotication = data.data;
          this.loading = false;
        } else if(!data.status){
          this.loading = false;
          this.userMessageNotication = null;
        }
      }
    )
  }
  openMessage(messages){
    var data = {chatid: messages.ChatID,senderid: this.user._id, all: messages }
    this.appCtrl.getRootNav().setRoot(MessagePage,{messageDetail: data})
  }
  newChat(){
      this.navCtrl.setRoot(ChatPage)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageListPage');
  }

}
