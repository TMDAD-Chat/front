import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContactInterface } from 'src/app/util/dto';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent {

  @Input() contactList: ContactInterface[] = [];
  selected!: number;
  @Output() selectEvent = new EventEmitter<ContactInterface>();

  constructor() { }

  selectContact(index: number) {
    this.selected = index;
    this.selectEvent.emit(this.contactList[index]);
  }

}
