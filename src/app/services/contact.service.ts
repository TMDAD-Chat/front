import {Injectable} from '@angular/core';
import { Observable, of} from 'rxjs';
import {AuthService} from "./auth.service";
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../util/dto';
import {RoomDto} from "../util/dto/room-dto";
import { Constants } from '../util/constants';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient, private auth: AuthService) { }

  getConversations(): Observable<UserDto[]> {
    if(this.auth.userDetails.email !== null) {
      return this.httpClient.get<UserDto[]>(
        Constants.conversationsListEndpoint(
          encodeURI(this.auth.userDetails.email)
        )
      );
    }else{
      return of([]);
    }
  }

  getUser(mail: string): Observable<UserDto> {
    return this.httpClient.get<UserDto>(
      Constants.getOrCreateUserEnpoint(encodeURI(mail))
    );
  }

  addContact(contactEmail: string) {
    const ownEmail = this.auth.userDetails.email || '';
    return this.httpClient.put<UserDto>(
      Constants.addContactEndpoint(ownEmail, contactEmail),
      null
    );
  }

  createGroup(roomName: string) {
    return this.httpClient.post<RoomDto>(
      Constants.createRoomEndpoint(this.auth.userDetails.email || ''),
      { roomName }
    );
  }

  getRoomInformation(roomId: number) : Observable<RoomDto> {
    return this.httpClient.get<RoomDto>(
      Constants.getRoomInfoEndpoint(roomId)
    );
  }

  addGroupMember(roomId: number, userEmail: string) {
    let formData: FormData = new FormData();
    formData.append('owner', this.auth.userDetails.email || "");
    return this.httpClient.put<RoomDto>(
      Constants.addUserToRoomEndpoint(roomId, userEmail),
      formData
    );
  }
}
