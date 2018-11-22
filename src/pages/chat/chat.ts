import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { MessagesProvider } from '../../providers/messages/messages';
import { UserProvider } from '../../providers/user/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageListPage } from '../../pages/message-list/message-list';
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  messageForm: FormGroup;
  allData:any;
  public messages: any;
  user: any;
  loading: any={};
  followerId:any;
  followersIds: any = [];
  followersList: any = [];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthenticationProvider,
    public formBuilder: FormBuilder,
    public msgService: MessagesProvider,
    public userService: UserProvider
  ) {
    this.user = this.authService.getCurrentUser();
    this.messageForm = this.formBuilder.group({
      message: ['',Validators.required],
      receiveruserid:[''],
      senderuserid:['']
    })
  }

  ionViewDidLoad() {
    this.getFollowerList(this.user._id)
  }
  getFollowerList(id) {
    this.loading.getFollower = true;
    this.userService.getFollower(id)
      .subscribe(
        data => {
      if (data.status) {
          this.followersIds = data.data;
          this.followersIds.Follower.forEach(followersList => {
          if (followersList.ParentStatus) {
                this.viewProfileByID(followersList.Userfollowerid);
              } else {
                this.loading.getFollower = false;
              }
            });
          }else{
            this.followersList = [];
            this.loading.getFollower = false;
          }
        },
        error => {});
  }
  sendMessage() {
    this.messageForm.patchValue({
      receiveruserid: this.followerId,
      senderuserid: this.user._id
    })
    this.loading.sendMsg = true;
    this.msgService.sendUserMessages(this.messageForm.value)
    .subscribe(data => {
    if (data.status) {
          this.loading.sendMsg = false;
          this.navCtrl.setRoot(MessageListPage);
        } else if (!data.status) {
          this.loading.sendMsg = false;
          this.messages = null;
        }
      })
  }
  viewProfileByID(id) {
    this.userService.viewProfileById(id)
    .subscribe( data => {
      if(data.status) {
        this.followersList.push(data.data);
        this.loading.getFollower = false;
      }
    })
  }
}
