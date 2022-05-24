import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';
import { MessageSseService } from 'src/app/services/sse/message.sse.service';
import { MessageInterface, MessageList, UserDto } from 'src/app/util/dto';
import {HttpService} from "../../services/http.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  contactList: UserDto[] = [];
  messages: Map<string, MessageInterface[]> = new Map<string, MessageInterface[]>();
  globalMessages: MessageInterface[] = [];
  globalMessagesSelected: boolean = false;
  selectedContact!: UserDto;
  currentUser!: UserDto;
  conversationsSubs!: Subscription;

  constructor(
    private messageService: MessageSseService,
    private authService: AuthService,
    private contactService: ContactService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.contactList = [];
    this.conversationsSubs = this.contactService.getConversations()
      .subscribe((contacts) => {
        this.contactList = contacts;
      });

    const selfEmail = this.authService.userDetails.email;
    if (selfEmail !== null) {
      this.contactService.getUser(selfEmail).subscribe(u => this.currentUser = u);
      const emitter = this.messageService.getMessages(encodeURI(selfEmail));
      emitter.subscribe((data: MessageList) => {
        console.log(data)
        if(this.isMessageForUser(data)) {
          data.messages.forEach(m => {
            let conversationEmail = m.sender;
            if (m.sender == selfEmail) {
              conversationEmail = data.recipient;
            }
            console.log("Saved message to %s", conversationEmail)
            let messageEntry = this.messages.get(conversationEmail);
            if (messageEntry === undefined) {
              messageEntry = [];
            }
            let foundWithSameId = false;
            messageEntry.forEach(savedMsg => {
              foundWithSameId ||= savedMsg.id == m.id;
            })

            if (!foundWithSameId) {
              messageEntry.push(m);
              messageEntry.sort((a, b) => a.creationTimestamp > b.creationTimestamp ? 1 : -1);
              this.messages.set(conversationEmail, messageEntry);
            }
          })
        }else if(this.isMessageForAllUsers(data)){
          data.messages.forEach(m => {
            console.log("Saved global message")
            let foundWithSameId = false;
            this.globalMessages.forEach(savedMsg => {
              foundWithSameId ||= savedMsg.id == m.id;
            })

            if (!foundWithSameId) {
              this.globalMessages.push(m);
              this.globalMessages.sort((a, b) => a.creationTimestamp > b.creationTimestamp ? 1 : -1);
            }
          })
        }
      })
    }else{
      return;
    }
  }

  selectContact(selected: UserDto) {
    // TODO: load chat messages
    this.selectedContact = selected;
    const messages = this.messages.get(selected.email)
    if((messages == undefined || messages.length < 10) && this.authService.userDetails.email !== null){
        this.httpService.requestOldMessagesBetween(this.authService.userDetails.email, selected.email).subscribe();
    }
    console.log("Selected new contact: %s", selected.email)
    this.globalMessagesSelected = false;
  }

  getConversationOfContact(selectedContact: UserDto) : MessageInterface[] {
    console.log("Obtained conversation of contact: %s", selectedContact.email)
    let messages = this.messages.get(selectedContact.email);
    if(messages === undefined){
      console.log("No messages found...")
      messages = [];
    }
    return messages;
  }

  isMessageForUser(m: MessageList) : boolean {
    return m.recipientType as unknown as string == "USER";
  }

  isMessageForAllUsers(m: MessageList) : boolean {
    return m.recipientType as unknown as string == "GLOBAL";
  }

  selectGlobalMessages() {
    const messages = this.globalMessages
    if((messages == undefined || messages.length < 10) && this.authService.userDetails.email !== null){
      this.httpService.requestOldGlobalMessagesBetween(this.authService.userDetails.email).subscribe();
    }
    console.log("Selected global messages")
    this.globalMessagesSelected = true;
  }

  ngOnDestroy(): void {
    if (!!this.conversationsSubs) {
      this.conversationsSubs.unsubscribe();
    }
  }
}
