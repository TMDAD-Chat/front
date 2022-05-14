import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {

  constructor(public bsModalRef: BsModalRef) { }


  addContact() {
    // TODO: crear conversación con contacto
  }
}
