import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Constants } from '../util/constants';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http: HttpClient) { }

  sendMessage(message: string, sender: string, to: string) : Observable<any> {
    const body = {
      content: message,
      sender: sender
    }
    return this.http.post<any>(Constants.sendMessageEndpoint(encodeURI(to)), body);
  }

  sendFile(file: File, from: string, to: string) : Observable<any> {
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('sender', from);
    return this.http.post<any>(Constants.sendFileEndpoint(encodeURI(to)), formData);
  }

  sendMessageToRoom(id: number, sender: string, message: string) {
    const body = {
      content: message,
      sender: sender
    }
    return this.http.post<any>(Constants.sendMessageRoomEndpoint(id), body);
  }

  sendFileToRoom(id: number, file: File, from: string) : Observable<any> {
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('sender', from);
    return this.http.post<any>(Constants.sendFileRoomEndpoint(id), formData);
  }
}
