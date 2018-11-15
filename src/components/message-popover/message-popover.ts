import { Component } from '@angular/core';
import { ViewController,App } from 'ionic-angular';
import { MessagesProvider } from '../../providers/messages/messages';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { MessageListPage } from '../../pages/message-list/message-list';
import {ChatPage} from '../../pages/chat/chat';

/**
 * Generated class for the MessagePopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'message-popover',
  templateUrl: 'message-popover.html',
  providers: [MessagesProvider, AuthenticationProvider]
})
export class MessagePopoverComponent {
  localData: any;
  loading: any;
  user: any;
  userMessageNotication: any = [];
  constructor(
  public viewCtrl: ViewController,
  public messageService: MessagesProvider,
  public authService: AuthenticationProvider,
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
  newChat(){
    this.appCtrl.getRootNav().setRoot(ChatPage)
    this.close()
  }
  viewAllMessages() {
    this.appCtrl.getRootNav().setRoot(MessageListPage)
    this.close()
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
}

