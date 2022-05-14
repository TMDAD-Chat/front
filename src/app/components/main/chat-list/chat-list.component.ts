import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserDto } from '../../../util/dto';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css'],
})
export class ChatListComponent implements OnInit {
  @Input() contactList: UserDto[] = [];
  selected!: number;
  @Output() selectEvent = new EventEmitter<UserDto>();
  @Output() globalMessagesEvent = new EventEmitter<VoidFunction>();

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

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

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  seeGlobalMessages() {
    this.selected = -1;
    this.globalMessagesEvent.emit();
  }
}
