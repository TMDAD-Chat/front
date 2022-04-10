import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatListComponent } from './chat-list/chat-list.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ContactComponent } from './chat-list/contact/contact.component';
import { MessageComponent } from './conversation/message/message.component';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [
    ChatListComponent,
    ConversationComponent,
    ContactComponent,
    MessageComponent,
    MainComponent,
  ],
  imports: [CommonModule, MainRoutingModule],
})
export class MainModule {}
