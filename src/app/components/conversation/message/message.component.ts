import { Component, Input, OnInit } from '@angular/core';
import { MessageInterface } from 'src/app/util/dto';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  @Input() message!: MessageInterface;
  isOwnMessage!: boolean;
  
  constructor() {}

  ngOnInit(): void {
    this.isOwnMessage = this.message.sender == 'me';
  }
}
