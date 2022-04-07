import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageInterface } from '../util/dto';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http: HttpClient) { }

  getConversationMessages(): Observable<MessageInterface[]> {
    return of([
      {
        messageType: 0,
        content: "Hi, how are you samim?",
        sender: "contact",
        creationTimestamp: new Date()
      },
      {
        messageType: 0,
        content: "Hi jassa i am good tnx how about you?",
        sender: "me",
        creationTimestamp: new Date()
      },
      {
        messageType: 0,
        content: "I am good too, thank you for your chat template",
        sender: "contact",
        creationTimestamp: new Date()
      },
      {
        messageType: 0,
        content: "You are welcome",
        sender: "me",
        creationTimestamp: new Date()
      }
    ]);
  }
}
