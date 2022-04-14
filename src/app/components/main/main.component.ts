import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';
import { MessageSseService } from 'src/app/services/sse/message.sse.service';
import { ContactInterface } from 'src/app/util/dto';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  contactList: ContactInterface[] = [];
  selectedContact!: ContactInterface;

  constructor(
    private messageService: MessageSseService,
    private authService: AuthService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {

    console.log(this.authService.userDetails);
    // const emitter = this.messageService.getMessages(environment['message_push_api'] + '/user/test');

    // emitter.subscribe((data: MessageList) => {
    //   console.log(data)
    // })

    this.contactService.getContacts().subscribe((list) => {
      this.contactList = list;
    });
  }

  selectContact(selected: ContactInterface) {
    // TODO: load chat messages
    this.selectedContact = selected;
  }
}
