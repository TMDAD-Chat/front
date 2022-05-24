import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomComponent } from './room.component';
import { RoomRoutingModule } from './room-routing.module';
import {MainModule} from "../main/main.module";
import {RoomChatListComponent} from "./chat-list/room-chat-list.component";
import { RoomConversationComponent } from './conversation/room.conversation.component';
import { AddChatMemberComponent } from './chat-list/add-chat-member/add-chat-member.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RoomChatListComponent,
    RoomConversationComponent,
    RoomComponent,
    AddChatMemberComponent,
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    MainModule,
    FormsModule,
    ModalModule.forChild(),
    BsDropdownModule,
  ],
})
export class RoomModule {}
