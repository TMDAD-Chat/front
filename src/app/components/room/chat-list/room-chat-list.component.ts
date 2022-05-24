import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';
import { RoomDto } from 'src/app/util/dto/room-dto';
import {UserDto} from "../../../util/dto";
import { AddChatMemberComponent } from './add-chat-member/add-chat-member.component';

@Component({
  selector: 'app-room-chat-list',
  templateUrl: './room-chat-list.component.html',
  styleUrls: ['./room-chat-list.component.css'],
})
export class RoomChatListComponent {
  @Input() participants: UserDto[] = [];
  @Input() roomId!: number;
  @Input() owner: UserDto | undefined;
  @Output() roomUpdate = new EventEmitter<RoomDto>();
  modalRef?: BsModalRef;

  constructor(
    public authService: AuthService,
    private router: Router,
    private modalService: BsModalService
  ) {}

  addContact() {
    this.modalRef = this.modalService.show(AddChatMemberComponent, {
      initialState: { roomId: this.roomId },
    });
    this.modalRef.content.onClose.subscribe((room: RoomDto) => {
      this.roomUpdate.emit(room);
    });
  }

  return() {
    this.router.navigate(['/']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
