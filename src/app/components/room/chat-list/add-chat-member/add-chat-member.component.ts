import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';
import { RoomDto } from 'src/app/util/dto/room-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-chat-member',
  templateUrl: './add-chat-member.component.html',
  styleUrls: ['./add-chat-member.component.css']
})
export class AddChatMemberComponent {

  contactEmail: string = "";
  roomId!: number;
  public onClose: Subject<RoomDto>;
  constructor(public bsModalRef: BsModalRef, private contactService: ContactService) { 
    this.onClose = new Subject();
  }


  addContact() {
    this.contactService.addGroupMember(this.roomId, this.contactEmail).subscribe({
      next: (room) => {
        this.onClose.next(room);
        this.bsModalRef.hide();
      },
      error: () => {
        Swal.fire({
          title: 'Error!',
          text: 'User not found',
          icon: 'error',
          confirmButtonText: 'Cool',
        });
      },
    });
  }
}
