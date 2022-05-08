import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';
import { MessageSseService } from 'src/app/services/sse/message.sse.service';
import { MessageInterface, MessageList, UserDto } from 'src/app/util/dto';
import {HttpService} from "../../services/http.service";
import { forkJoin, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  contactList: UserDto[] = [];
  messages: Map<string, MessageInterface[]> = new Map<string, MessageInterface[]>();
  selectedContact!: UserDto;

  constructor(
    private messageService: MessageSseService,
    private authService: AuthService,
    private contactService: ContactService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.contactList = [];
    const conversations = this.contactService.getConversations();
    conversations
      .pipe(
        switchMap((conversations) => {
          if (conversations !== undefined) {
            const userReq = conversations.conversations.map((c) =>
              this.contactService.getUser(c.sender)
            );
            // TODO: obtener la información de los contactos desde la primer petición
            return forkJoin(userReq);
          } else return of([]);
        })
      )
      .subscribe((contacts) => {
        this.contactList = contacts;
      });

    const selfEmail = this.authService.userDetails.email;
    if (selfEmail !== null) {
      const emitter = this.messageService.getMessages(encodeURI(selfEmail));
      emitter.subscribe((data: MessageList) => {
        console.log(data)
        data.messages.forEach(m => {
          let conversationEmail = m.sender;
          if(m.sender == selfEmail){
            conversationEmail = data.recipient;
          }
          console.log("Saved message to %s", conversationEmail)
          let messageEntry = this.messages.get(conversationEmail);
          if(messageEntry === undefined){
            messageEntry = [];
          }
          let foundWithSameId = false;
          messageEntry.forEach(savedMsg => {
            foundWithSameId ||= savedMsg.id == m.id;
          })

          if(!foundWithSameId) {
            messageEntry.push(m);
            messageEntry.sort((a, b) => a.creationTimestamp > b.creationTimestamp ? 1 : -1);
            this.messages.set(conversationEmail, messageEntry);
          }
        })
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
}
