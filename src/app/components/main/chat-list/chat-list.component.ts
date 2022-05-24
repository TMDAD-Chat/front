import { Component, EventEmitter, Input, Output,  } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';
import { UserDto } from '../../../util/dto';
import { AddContactComponent } from './add-contact/add-contact.component';
import { CreateGroupComponent } from './create-group/create-group.component';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css'],
})
export class ChatListComponent {
  @Input() contactList: UserDto[] = [];
  selected!: number;
  @Output() selectEvent = new EventEmitter<UserDto>();
  @Output() globalMessagesEvent = new EventEmitter<VoidFunction>();
  modalRef?: BsModalRef;

  constructor(
    public authService: AuthService,
    private router: Router,
    private modalService: BsModalService
  ) {}

  selectContact(index: number) {
    this.selected = index;
    this.selectEvent.emit(this.contactList[index]);
  }

  addContact() {
    this.modalRef = this.modalService.show(AddContactComponent);
    this.modalRef.content.onClose.subscribe((contact: UserDto) => {
      this.contactList.unshift(contact);
    });
  }

  createGroup() {
    this.modalRef = this.modalService.show(CreateGroupComponent);
    this.modalRef.content.onClose.subscribe((roomId: number) => {
      this.router.navigate([`/room/${roomId}`]);
    });
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
