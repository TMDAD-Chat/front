import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from 'src/app/services/auth.service';
import {UserDto} from "../../../util/dto";

@Component({
  selector: 'app-room-chat-list',
  templateUrl: './room-chat-list.component.html',
  styleUrls: ['./room-chat-list.component.css']
})
export class RoomChatListComponent implements OnInit{

  @Input() participants: UserDto[] = [];
  @Input() owner: UserDto | undefined;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    $('#action_menu_btn').click(function(){
      $('.action_menu').toggle();
    });
  }

  addContact() {
    console.log('añadir contacto');
  }

  createGroup() {
    console.log('crear grupo');
  }

  logout() {
    console.log("Logout user");
    this.authService.logout();
  }
}
