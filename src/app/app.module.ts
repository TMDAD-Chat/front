import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ConversationComponent } from './components/conversation/conversation.component';
import { ContactComponent } from './components/chat-list/contact/contact.component';
import { MessageComponent } from './components/conversation/message/message.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ChatListComponent,
    ConversationComponent,
    ContactComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
