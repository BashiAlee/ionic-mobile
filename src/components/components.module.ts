import { NgModule } from '@angular/core';
import { PopoverContributionComponent } from './popover-contribution/popover-contribution';
import { UserPopoverComponent } from './user-popover/user-popover';
import { NotificationPopoverComponent } from './notification-popover/notification-popover';
import { MessagePopoverComponent } from './message-popover/message-popover';
@NgModule({
	declarations: [PopoverContributionComponent,
    UserPopoverComponent,
    NotificationPopoverComponent,
    MessagePopoverComponent],
	imports: [],
	exports: [PopoverContributionComponent,
    UserPopoverComponent,
    NotificationPopoverComponent,
    MessagePopoverComponent]
})
export class ComponentsModule {}
