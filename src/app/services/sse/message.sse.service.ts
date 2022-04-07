import {Injectable, NgZone} from '@angular/core';
import {SseService} from "./sse.service";
import {Observable} from "rxjs";
import {MessageList} from "../../util/dto/message-list";

@Injectable({
  providedIn: 'root'
})
export class MessageSseService {

  constructor(private zone: NgZone, private sseService: SseService) { }

  getMessages(uri: string){
    return Observable.create((observer: { next: (arg0: MessageList) => void; error: (arg0: Event) => void; }) => {
      const eventSource = this.sseService.getEventSource(uri);

      eventSource.onopen= () => {
        console.log("Opening connection.Ready State is %i."+ eventSource.readyState);
      }


      eventSource.onmessage = ev => {
        console.log("New message received: {}.", ev.data)
        this.zone.run(() => {
          observer.next(ev.data);
        })
      }

      eventSource.onerror = ev => {
        this.zone.run(() => {
          console.error(ev)
          observer.error(ev);
        })
      }
    })
  }
}
