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
  receiveruserid: any;
  senderuserid: any;
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
          this.userMessageNotication.forEach(value => {
            if(value.User2ID == this.user._id) {
             
                this.receiveruserid = value.User1ID,
                this.senderuserid =  this.user._id
            } else {
                this.receiveruserid = value.User2ID,
                this.senderuserid =  this.user._id
        
            }
            var data = {chatid: value.ChatID,senderid: this.senderuserid}
            this.messageService.getUserMessages(data)
            .subscribe((data) => {
              if(data.status) {
                var message = data.data.Messages;
                // console.log("SS", message[message.length-1].Mess)
                value.message = message[message.length-1].Message
                this.loading = false;

              } else {
                value.message = ""
                this.loading = false;
              }
            })
          });

          // console.log("sdfsdf",this.userMessageNotication)
       
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
