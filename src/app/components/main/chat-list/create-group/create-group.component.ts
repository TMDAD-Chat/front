import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent {

  groupName!: string;
  onClose: Subject<number>;
  constructor(public bsModalRef: BsModalRef, private roomService: ContactService) {
    this.onClose = new Subject();
  }

  createGroup() {
    this.roomService.createGroup(this.groupName).subscribe({
      next: (res) => {
        this.onClose.next(res.id);
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
    })
  }
}
