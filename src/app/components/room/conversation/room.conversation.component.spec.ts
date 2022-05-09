import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomConversationComponent } from './room.conversation.component';

describe('ConversationComponent', () => {
  let component: RoomConversationComponent;
  let fixture: ComponentFixture<RoomConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomConversationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
