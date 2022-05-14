import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatListComponent } from './chat-list/chat-list.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ContactComponent } from './chat-list/contact/contact.component';
import { MessageComponent } from './conversation/message/message.component';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import {GlobalConversationComponent} from "./conversation/global/global.conversation.component";
import { AddContactComponent } from './chat-list/add-contact/add-contact.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    ChatListComponent,
    ConversationComponent,
    GlobalConversationComponent,
    ContactComponent,
    MessageComponent,
    MainComponent,
    AddContactComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ModalModule.forChild(),
    BsDropdownModule,
  ],
  exports: [
    ContactComponent,
    ConversationComponent,
    MessageComponent
  ]
})
export class MainModule {}
