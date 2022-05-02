import {Injectable} from '@angular/core';
import { Observable} from 'rxjs';
import {HttpService} from "./http.service";
import {AuthService} from "./auth.service";
import {ConversationsDto} from "../util/dto/conversations-dto";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpService: HttpService, private auth: AuthService) { }

  getConversations(): Observable<ConversationsDto> | undefined {
    if(this.auth.userDetails.email !== null) {
      return this.httpService.getConversations(this.auth.userDetails.email)
    }else{
      return undefined;
    }
  }
}
