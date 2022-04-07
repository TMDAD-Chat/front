import { Component, Input, OnInit } from '@angular/core';
import { ConversationService } from 'src/app/services/conversation.service';
import { ContactInterface, MessageInterface } from 'src/app/util/dto';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  @Input() contact!: ContactInterface;
  messageList!: MessageInterface[];
  constructor(private conversationService: ConversationService) { }

  ngOnInit(): void {
    this.conversationService.getConversationMessages().subscribe({
      next: (messages) => {
        this.messageList = messages;
      },
      error: (err) => {
        this.messageList = [];
      },
    });
  }

}
