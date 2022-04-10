import { Component, Input } from '@angular/core';
import { ContactInterface } from 'src/app/util/dto';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  @Input() contact!: ContactInterface;
  @Input() active: boolean = false;

  constructor() { }

}
