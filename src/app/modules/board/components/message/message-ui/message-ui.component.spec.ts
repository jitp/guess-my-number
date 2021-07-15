import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageUiComponent } from './message-ui.component';

describe('MessageUiComponent', () => {
  let component: MessageUiComponent;
  let fixture: ComponentFixture<MessageUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
