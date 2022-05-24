import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';
import { UserDto } from 'src/app/util/dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {

  contactEmail: string = "";
  public onClose: Subject<UserDto>;
  constructor(public bsModalRef: BsModalRef, private contactService: ContactService) { 
    this.onClose = new Subject();
  }


  addContact() {
    this.contactService.addContact(this.contactEmail).subscribe({
      next: (contact) => {
        this.onClose.next(contact);
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
