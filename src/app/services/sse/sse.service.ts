import { Injectable } from '@angular/core';
import { EventSourcePolyfill } from 'event-source-polyfill';


@Injectable({
  providedIn: 'root'
})
export class SseService {

  getEventSource(uri: string, headers: {'X-Auth-Firebase': string, 'X-Auth-User': string}): EventSource {
    const eventSourceInitDict = {headers: headers};
    return new EventSourcePolyfill(uri, eventSourceInitDict);
  }
}
