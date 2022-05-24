import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';
import { MessageSseService } from 'src/app/services/sse/message.sse.service';
import { MessageInterface, MessageList, UserDto } from 'src/app/util/dto';
import {HttpService} from "../../services/http.service";
import { of, switchMap } from 'rxjs';
import {ActivatedRoute, Router} from "@angular/router";
import {RoomDto} from "../../util/dto/room-dto";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  messages: MessageInterface[] = [];
  currentUser!: UserDto;
  connectedRoom!: RoomDto;
  ownUser!: UserDto;

  constructor(
    private messageService: MessageSseService,
    private authService: AuthService,
    private contactService: ContactService,
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const selfEmail = this.authService.userDetails.email;
    if (selfEmail !== null) {
      this.activatedRoute.paramMap.pipe(
        switchMap(
        paramMap => {
        const roomId = paramMap.get('id');
        if(roomId !== null){
          const roomIdAsNumber = Number(roomId);
          console.log("User entered the room %d", roomIdAsNumber);
          return this.contactService.getRoomInformation(roomIdAsNumber);
        }else{
          return of(null);
        }
        }),
        switchMap((room) => {
        if(room !== null) {
          this.connectedRoom = room;
          console.log(this.connectedRoom);
          if(selfEmail == room.owner.email){
            this.ownUser = room.owner;
          }else{
            room.users.forEach(u => {
              if(selfEmail == u.email){
                this.ownUser = u;
              }
            })
          }
          this.httpService.requestOldRoomMessagesIn(room.id, selfEmail).subscribe();
          return this.messageService.getRoomMessages(room.id, selfEmail);
        }else{
          return of(null);
        }
        })
      ).subscribe({
        next: (data: MessageList | null) => {
        if(data === null){
          return;
        }

        console.log(data)
        if(this.isMessageForRoom(data) && (this.connectedRoom !== undefined && data.recipient == this.connectedRoom.id.toString())){
          data.messages.forEach(m => {
            console.log("Saved new room message")
            let foundWithSameId = false;
            this.messages.forEach(savedMsg => {
              foundWithSameId ||= savedMsg.id == m.id;
            })

            if (!foundWithSameId) {
              this.messages.push(m);
              this.messages.sort((a, b) => a.creationTimestamp > b.creationTimestamp ? 1 : -1);
            }
          })
        }
        },
        error: () => {
          Swal.fire({
            title: 'Error!',
            text: 'Room not found',
            icon: 'error',
            confirmButtonText: 'Cool',
          });
          this.router.navigate(['/']);
        }
      })
      this.contactService.getUser(selfEmail).subscribe(u => this.currentUser = u);
    }
  }

  isMessageForRoom(m: MessageList) : boolean {
    return m.recipientType as unknown as string == "ROOM";
  }

  roomUpdate(update: RoomDto) {
    this.connectedRoom.users = update.users;
  }
}
