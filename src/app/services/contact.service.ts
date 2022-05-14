import {Injectable} from '@angular/core';
import { Observable, of} from 'rxjs';
import {AuthService} from "./auth.service";
import {ConversationsDto} from "../util/dto/conversations-dto";
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../util/dto';
import {RoomDto} from "../util/dto/room-dto";
import { Constants } from '../util/constants';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient, private auth: AuthService) { }

  getConversations(): Observable<ConversationsDto | undefined> {
    if(this.auth.userDetails.email !== null) {
      return this.httpClient.get<ConversationsDto>(
        Constants.conversationsListEndpoint(
          encodeURI(this.auth.userDetails.email)
        )
      );
    }else{
      return of(undefined);
    }
  }

  getUser(mail: string): Observable<UserDto> {
    return this.httpClient.get<UserDto>(
      Constants.getOrCreateUserEnpoint(encodeURI(mail))
    );
  }

  getRoomInformation(roomId: number) : Observable<RoomDto> {
    return this.httpClient.get<RoomDto>(
      Constants.getRoomInfoEndpoint(roomId)
    );
  }
}
