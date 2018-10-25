import {
  NgModule
} from '@angular/core';
import {
  PopoverContributionComponent
} from './popover-contribution/popover-contribution';
import {
  UserPopoverComponent
} from './user-popover/user-popover';
import {
  NotificationPopoverComponent
} from './notification-popover/notification-popover';
import {
  MessagePopoverComponent
} from './message-popover/message-popover';
import {
  HeaderComponent
} from './header/header';
@NgModule({
  declarations: [
    PopoverContributionComponent,
    UserPopoverComponent,
    NotificationPopoverComponent,
    MessagePopoverComponent,
    HeaderComponent
  ],
  imports: [],
  exports: [
    PopoverContributionComponent,
    UserPopoverComponent,
    NotificationPopoverComponent,
    MessagePopoverComponent,
    HeaderComponent
  ]
})
export class ComponentsModule {}
