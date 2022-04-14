import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContactInterface } from 'src/app/util/dto';
import * as $ from 'jquery';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit{

  @Input() contactList: ContactInterface[] = [];
  selected!: number;
  @Output() selectEvent = new EventEmitter<ContactInterface>();

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    $('#action_menu_btn').click(function(){
      $('.action_menu').toggle();
    });
  }

  selectContact(index: number) {
    this.selected = index;
    this.selectEvent.emit(this.contactList[index]);
  }

  addContact() {
    console.log('añadir contacto');
  }

  createGroup() {
    console.log('crear grupo');
  }
}
