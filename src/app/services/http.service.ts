import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { Constants } from '../util/constants';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  requestOldMessagesBetween(loggedUser: string, otherUser: string): Observable<any> {
    return this.httpClient.get(
      Constants.getoldConversationMessagesEndpoint(
        encodeURI(loggedUser),
        encodeURI(otherUser)
      )
    );
  }

  requestOldGlobalMessagesBetween(email: string) {
    return this.httpClient.get(
      Constants.getOldGlobalMessagesEndpoint(encodeURI(email))
    );
  }

  requestOldRoomMessagesIn(id: number, email: string) {
    return this.httpClient.get(environment.gateway + environment.messageReceiveApi + "/room/"+id+"/conversation/" + encodeURI(email))
  }
}
