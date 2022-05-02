import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http: HttpClient, private httpService: HttpService) { }

  /*getConversationMessages(): Observable<MessageInterface[]> {
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
        messageType: 1,
        content: "panigale.jpg",
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
  }*/

  sendMessage(message: string, sender: string, to: string) : Observable<any> {
    const body = {
      content: message,
      sender: sender
    }
    return this.httpService.sendMessage(body, to);
  }

  sendFile(file: File, from: string, to: string) : Observable<any> {
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('sender', from);
    return this.httpService.sendFile(to, formData);
  }
}
