import { TestBed } from '@angular/core/testing';

import { MessageSseService } from './message.sse.service';

describe('Message.SseService', () => {
  let service: MessageSseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageSseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
