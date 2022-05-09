import {Component, Input, OnInit} from '@angular/core';
import { ConversationService } from 'src/app/services/conversation.service';
import { MessageInterface } from 'src/app/util/dto';
import {UserDto} from "../../../util/dto/user-dto";
import {AuthService} from "../../../services/auth.service";
import {RoomDto} from "../../../util/dto/room-dto";

@Component({
  selector: 'app-room-conversation',
  templateUrl: './room.conversation.component.html',
  styleUrls: ['./room.conversation.component.css']
})
export class RoomConversationComponent implements OnInit {

  @Input() room!: RoomDto;
  @Input() conversation!: MessageInterface[];
  @Input() currentUser!: UserDto;

  constructor(private conversationService: ConversationService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  sendMessage(message: string) {
    console.log('Sending message');
    if(this.authService.userDetails.email !== null && this.room !== undefined) {
      this.conversationService
        .sendMessageToRoom(
          this.room.id,
          this.authService.userDetails.email,
          message
        )
        .subscribe((res) => {console.log(res)});
    }
  }

  sendFile(event: any) {

    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      if(this.authService.userDetails.email !== null && this.room !== undefined) {
        this.conversationService.sendFileToRoom(this.room.id, file, this.authService.userDetails.email).subscribe({
          next: (data) => console.log(data),
          error: (error) => console.error(error),
        });
      }
    }
  }
}
