import { Injectable } from '@angular/core';
import {User} from "../util/dto/user";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ConversationsDto} from "../util/dto/conversations-dto";
import {UserDto} from "../util/dto/user-dto";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  registerUser(user: User): Observable<User> {
    return this.httpClient.put<User>(environment.gateway + environment.userApi + "/user/" + encodeURI(user.email), user);
  }

  getConversations(mail: string): Observable<ConversationsDto> {
    return this.httpClient.get<ConversationsDto>(environment.gateway + environment.messageReceiveApi + "/user/" + encodeURI(mail) + "/conversations")
  }

  getUser(mail: string): Observable<UserDto> {
    return this.httpClient.get<UserDto>(environment.gateway + environment.userApi + "/user/" + encodeURI(mail));
  }

  requestOldMessagesBetween(loggedUser: string, otherUser: string): Observable<any> {
    return this.httpClient.get(environment.gateway + environment.messageReceiveApi + "/user/"+encodeURI(loggedUser)+"/conversation/" + encodeURI(otherUser))
  }

  sendMessage(body: { content: string, sender: string }, to: string) : Observable<any> {
    return this.httpClient.post<any>(environment.gateway + environment.messageReceiveApi + "/user/" + encodeURI(to) + "/message", body);
  }

  sendFile(to: string, formData: FormData) : Observable<any> {
    return this.httpClient.post<any>(environment.gateway + environment.messageReceiveApi + "/user/" + encodeURI(to) + "/file", formData);
  }
}
