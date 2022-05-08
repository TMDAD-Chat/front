import {Component, Input, OnInit} from '@angular/core';
import { ConversationService } from 'src/app/services/conversation.service';
import {MessageInterface, UserDto} from 'src/app/util/dto';
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-global-conversation',
  templateUrl: './global.conversation.component.html',
  styleUrls: ['./global.conversation.component.css']
})
export class GlobalConversationComponent implements OnInit {

  @Input() currentUser!: UserDto;
  @Input() conversation!: MessageInterface[];

  constructor(private conversationService: ConversationService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  sendMessage(message: string) {
    console.log('Sending message');
    if(this.authService.userDetails.email !== null) {
      //TODO DECIDE IF GLOBAL MESSAGES SHALL BE SENT FROM HERE
      /*this.conversationService
        .sendMessage(
          message,
          this.authService.userDetails.email,
          this.contact.email
        )
        .subscribe((res) => {console.log(res)});*/
    }
  }
}
