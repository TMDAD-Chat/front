import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';
import { RoomDto } from 'src/app/util/dto/room-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  rooms!: RoomDto[]
  constructor(private router: Router, private contactService: ContactService, public authService: AuthService) { }

  ngOnInit(): void {
    this.contactService.getRoomList().subscribe({
      next: (list) => {
        this.rooms = list;
        console.log(list);
      },
      error: () => {
        Swal.fire({
          title: 'No Chat Rooms!',
          text: 'No chat rooms found',
          icon: 'warning',
          confirmButtonText: 'Cool',
        });
      }
    })
  }

  selectRoom(room: RoomDto) {
    this.router.navigate([`/room/${room.id}`]);
  }

  return() {
    this.router.navigate(['/']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
