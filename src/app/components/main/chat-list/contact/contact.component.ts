import { Component, Input } from '@angular/core';
import {UserDto} from "../../../../util/dto/user-dto";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  @Input() contact!: UserDto;
  @Input() active: boolean = false;

  constructor() { }

}
