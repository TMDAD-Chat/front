import {Injectable, NgZone} from '@angular/core';
import {SseService} from "./sse.service";
import {from, Observable, switchMap} from "rxjs";
import {MessageList} from "../../util/dto";
import { Constants } from 'src/app/util/constants';
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class MessageSseService {

  constructor(private zone: NgZone, private sseService: SseService, private authService: AuthService) { }

  private buildMessageObservable(finalUri: string): Observable<MessageList> {
    return from(this.authService.getToken()).pipe(
      switchMap(data => {
        const token = data.left;
        const user = data.right;

        return Observable.create((observer: { next: (arg0: MessageList) => void; error: (arg0: Event) => void; }) => {
          const eventSource = this.sseService.getEventSource(finalUri, {
            'X-Auth-Firebase': token,
            'X-Auth-User': user
          });

          eventSource.onopen= () => {
            console.log("Opening connection.Ready State is %i."+ eventSource.readyState);
          }

          eventSource.onmessage = ev => {
            console.log("New message received: {}.", ev.data)
            this.zone.run(() => {
              observer.next(JSON.parse(ev.data));
            })
          }

          eventSource.onerror = ev => {
            this.zone.run(() => {
              console.error(ev)
              observer.error(ev);
            })
          }
        })
      })
    ) as Observable<MessageList>;
  }

  getMessages(userEmail: string): Observable<MessageList>{
    return this.buildMessageObservable(Constants.getEventsEnpoint(userEmail));
  }

  getRoomMessages(roomId: number, userEmail: string) {
    return this.buildMessageObservable(
      Constants.getRoomEventsEnpoint(roomId, encodeURI(userEmail))
    );
  }
}
