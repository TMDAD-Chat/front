import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

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
    return this.http.post<any>(environment.gateway + environment.messageReceiveApi + "/user/" + encodeURI(to) + "/message", body);
  }

  sendFile(file: File, from: string, to: string) : Observable<any> {
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('sender', from);
    return this.http.post<any>(environment.gateway + environment.messageReceiveApi + "/user/" + encodeURI(to) + "/file", formData);
  }
}
