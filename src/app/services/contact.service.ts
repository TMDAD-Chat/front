import {Injectable} from '@angular/core';
import { Observable, of} from 'rxjs';
import {AuthService} from "./auth.service";
import {ConversationsDto} from "../util/dto/conversations-dto";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserDto } from '../util/dto';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient, private auth: AuthService) { }

  getConversations(): Observable<ConversationsDto | undefined> {
    if(this.auth.userDetails.email !== null) {
      return this.httpClient.get<ConversationsDto>(
        environment.gateway +
          environment.messageReceiveApi +
          '/user/' +
          encodeURI(this.auth.userDetails.email) +
          '/conversations'
      );
    }else{
      return of(undefined);
    }
  }

  getUser(mail: string): Observable<UserDto> {
    return this.httpClient.get<UserDto>(
      environment.gateway + environment.userApi + '/user/' + encodeURI(mail)
    );
  }
}
