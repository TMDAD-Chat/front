import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalConversationComponent } from './global.conversation.component';

describe('ConversationComponent', () => {
  let component: GlobalConversationComponent;
  let fixture: ComponentFixture<GlobalConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalConversationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
