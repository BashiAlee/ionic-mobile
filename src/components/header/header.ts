import { Component } from '@angular/core';
import { PopoverController, NavController } from 'ionic-angular';
import { MessagePopoverComponent } from '../message-popover/message-popover';
import { NotificationPopoverComponent } from '../notification-popover/notification-popover';
import { UserPopoverComponent } from '../user-popover/user-popover';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { SearchContributionPage } from '../../pages/search-contribution/search-contribution';
import { DomSanitizer } from '@angular/platform-browser';
import { ParentProvider } from '../../providers/parent/parent';
import { MessagesProvider } from '../../providers/messages/messages';
import { UserProvider } from '../../providers/user/user';
import { ContributionsProvider } from '../../providers/contributions/contributions';

import * as _ from 'lodash';

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header',
  templateUrl: 'header.html',
  providers: [AuthenticationProvider, ParentProvider]
})
export class HeaderComponent {
  user: any;
  query: any;
  showSearch: any = false;
  newMessage: any = false;
  newNotification: any = false;
  showDiv: any = false;
  keyWords: any = [];

  constructor( public popoverCtrl: PopoverController,
    public navCtrl: NavController,
    public authService: AuthenticationProvider,
    public parentService: ParentProvider,
    public messageService: MessagesProvider,
    public userService: UserProvider,
    public contributionService: ContributionsProvider
  ) {
    this.user = this.authService.getCurrentUser();
    var id = this.user._id;
    this.getMentorStatus(id);
    this.getMessageStatus(id);
    this.getAllNotifications(id);
    this.getAllKeywords();

  }

  getAllKeywords() {
    this.contributionService.getAllContribution()
    .subscribe(data => {
      if(data.status) {
        data.data.forEach(value => {
          if(value.AdminStatus) {
            if(value.MainCategory) {
              this.keyWords.push({name: value.MainCategory})
            }

            if(value.SubCategories) {
              this.keyWords.push({name: value.SubCategories})
            }

            if(value.Tags && value.Tags[0].Tag) {{
              value.Tags.forEach(tag => {
                this.keyWords.push({name: tag.Tag})
              });
            }} 
          }
        });
        this.keyWords = _.uniqBy(this.keyWords, 'name');
        console.log("ttt", this.keyWords)
      } else {

      }
    })
  }

  messagePopover(myEvent) {
    let popover = this.popoverCtrl.create(MessagePopoverComponent);
    popover.present({
      ev: myEvent
    });
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

  onInput(e) {
    console.log("FFFF")
  }

  
  onCancel(e) {
    this.showSearch = false;
  }

  searchByKeyword(code) {
    if(code == 13) {
      this.navCtrl.setRoot(SearchContributionPage, {query: this.query})
    }
  }

  moveToSearch(val) {
    this.showDiv = false;
    console.log("Cli",val)
    this.query = val;
    this.navCtrl.setRoot(SearchContributionPage, {query: val})
  }


  getMentorStatus(id) {
    this.parentService.getMentorFormStatus(id)
    .subscribe((data)=>{
      if(data.status) {
        localStorage.setItem('mentorStatus',data.data.status);
      }
    })
  }

  getMessageStatus(id) {
    var data = {senderid: id}
    this.messageService.getStatusOfChat(data)
    .subscribe((data) => {
      if(data.status) {
        this.newMessage = true;
      } else {
        this.newMessage = false;
      }
    })
  }

  getAllNotifications(id) {
    var data = {userid:id}
    this.userService.getAllNotifications(data)
    .subscribe((data) => {
      if(data.status) {
        this.newNotification = data.data[0].NewNotification
      } else {
        this.newNotification = false;
      }
    })
    
  }

  readNotifications() {
    this.newNotification = false;
    var data = {userid : this.user._id};
    this.userService.changeNotificationsStatus(data)
    .subscribe((data) => {
      
    })
  }

  focusFunction() {
    console.log("GGGGGG")
  }


}
