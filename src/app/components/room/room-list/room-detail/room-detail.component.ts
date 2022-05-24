import { Component, Input, OnInit } from '@angular/core';
import { RoomDto } from 'src/app/util/dto/room-dto';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  @Input() room!: RoomDto;
  constructor() { }

  ngOnInit(): void {
  }

}
