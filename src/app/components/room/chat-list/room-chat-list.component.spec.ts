import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomChatListComponent } from './room-chat-list.component';

describe('ChatListComponent', () => {
  let component: RoomChatListComponent;
  let fixture: ComponentFixture<RoomChatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomChatListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
