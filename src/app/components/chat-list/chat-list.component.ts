import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { ContactInterface } from 'src/app/util/dto';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  contactList: ContactInterface[] = [];
  selected!: number;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(
      list => {
        this.contactList = list;
      }
    )
  }

  selectContact(index: number) {
    // TODO: load chat messages
    this.selected = index;
  }

}
