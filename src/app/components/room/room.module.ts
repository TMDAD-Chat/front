import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { ContactComponent } from './chat-list/contact/contact.component';
//import { MessageComponent } from './conversation/message/message.component';
import { RoomComponent } from './room.component';
import { RoomRoutingModule } from './room-routing.module';
import {MainModule} from "../main/main.module";
import {RoomChatListComponent} from "./chat-list/room-chat-list.component";
import {RoomConversationComponent} from "./conversation/room.conversation.component";

@NgModule({
  declarations: [
    RoomChatListComponent,
    RoomConversationComponent,
    //ContactComponent,
    //MessageComponent,
    RoomComponent,
  ],
  imports: [CommonModule, RoomRoutingModule, MainModule],
})
export class RoomModule {}
