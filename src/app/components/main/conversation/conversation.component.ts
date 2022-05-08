import {Component, Input, OnInit} from '@angular/core';
import { ConversationService } from 'src/app/services/conversation.service';
import { MessageInterface } from 'src/app/util/dto';
import {UserDto} from "../../../util/dto/user-dto";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  @Input() contact!: UserDto;
  @Input() conversation!: MessageInterface[];

  constructor(private conversationService: ConversationService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  sendMessage(message: string) {
    console.log('Sending message');
    if(this.authService.userDetails.email !== null) {
      this.conversationService
        .sendMessage(
          message,
          this.authService.userDetails.email,
          this.contact.email
        )
        .subscribe((res) => {console.log(res)});
    }
  }

  sendFile(event: any) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      if(this.authService.userDetails.email !== null) {
        this.conversationService.sendFile(file, this.authService.userDetails.email, this.contact.email).subscribe({
          next: (data) => console.log(data),
          error: (error) => console.error(error),
        });
      }
    }
  }
}
