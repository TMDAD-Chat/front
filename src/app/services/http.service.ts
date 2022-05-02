import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  requestOldMessagesBetween(loggedUser: string, otherUser: string): Observable<any> {
    return this.httpClient.get(environment.gateway + environment.messageReceiveApi + "/user/"+encodeURI(loggedUser)+"/conversation/" + encodeURI(otherUser))
  }

}
