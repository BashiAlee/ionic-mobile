import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessagesProvider } from '../../providers/messages/messages';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageListPage } from '../../pages/message-list/message-list';
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
  messageForm: FormGroup;
  id: any;
  allData:any;
  public messages: any;
  loading: any=[];
  user: any;

  constructor(
    public navParams: NavParams,
    public userService: MessagesProvider,
    public formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public authService: AuthenticationProvider
  ) {
    this.user = this.authService.getCurrentUser();
    this.id = this.navParams.get('messageDetail')
    this.allData = this.navParams.get('messageDetail').all
    console.log("this ", this.allData)

    this.messageForm = this.formBuilder.group({
      message: [''],
      receiveruserid:[''],
      senderuserid:['']
    })

    if(this.allData.User2ID == this.user._id) {
      this.messageForm.patchValue({
        receiveruserid: this.allData.User1ID,
        senderuserid: this.user._id
      })
    } else {
      this.messageForm.patchValue({
        receiveruserid: this.allData.User2ID,
        senderuserid: this.user._id
      })
    }
  }

  ionViewDidLoad() {
    this.getMessages(this.id)
  }
  goTo(){
    this.navCtrl.setRoot(MessageListPage)
  }
  getMessages(id) {
    this.loading.getMsg = true;
    this.userService.getUserMessages(id)
      .subscribe(data => {
        if (data.status) {
          this.messages = data.data.Messages;
          this.loading.getMsg= false;
        } else if (!data.status) {
          this.messages = null;
          this.loading.getMsg= false;
        }
      })
  }
  sendMessage() {
    this.loading.sendMsg = true;
    this.userService.sendUserMessages(this.messageForm.value)
      .subscribe(data => {
    if (data.status) {
          this.loading.sendMsg = false;
          this.getMessages(this.id)
        } else if (!data.status) {
          this.loading.sendMsg = false;
          this.messages = null;
        }
      })
  }
}
