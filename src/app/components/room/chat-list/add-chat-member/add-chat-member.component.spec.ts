import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChatMemberComponent } from './add-chat-member.component';

describe('AddChatMemberComponent', () => {
  let component: AddChatMemberComponent;
  let fixture: ComponentFixture<AddChatMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChatMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChatMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
