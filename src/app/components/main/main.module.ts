import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
import { CreateGroupComponent } from './chat-list/create-group/create-group.component';

@NgModule({
  declarations: [
    ChatListComponent,
    ConversationComponent,
    GlobalConversationComponent,
    ContactComponent,
    MessageComponent,
    MainComponent,
    AddContactComponent,
    CreateGroupComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ModalModule.forChild(),
    BsDropdownModule,
    FormsModule
  ],
  exports: [
    ContactComponent,
    ConversationComponent,
    MessageComponent
  ]
})
export class MainModule {}
