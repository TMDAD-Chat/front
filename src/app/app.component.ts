import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {MessageSseService} from "./services/sse/message.sse.service";
import {MessageList} from "./util/dto/message-list";
import {environment} from "../environments/environment";
import { ContactService } from './services/contact.service';
import { ContactInterface } from './util/dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  contactList: ContactInterface[] = [];
  selectedContact!: ContactInterface;

  constructor(private messageService : MessageSseService, private contactService: ContactService) {
  }

  ngOnInit(): void {
    $('#action_menu_btn').click(function(){
      $('.action_menu').toggle();
    });

    const emitter = this.messageService.getMessages(environment['message_push_api'] + '/user/test');

    emitter.subscribe((data: MessageList) => {
      console.log(data)
    })

    this.contactService.getContacts().subscribe((list) => {
      this.contactList = list;
    });
  }

  selectContact(selected: ContactInterface) {
    // TODO: load chat messages
    this.selectedContact = selected;
  }
}
