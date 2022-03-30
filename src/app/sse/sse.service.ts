import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SseService {

  getEventSource(uri: string): EventSource {
    return new EventSource(uri);
  }
}
