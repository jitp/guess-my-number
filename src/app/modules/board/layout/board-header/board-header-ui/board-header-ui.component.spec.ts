import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardHeaderUiComponent } from './board-header-ui.component';

describe('BoardHeaderUiComponent', () => {
  let component: BoardHeaderUiComponent;
  let fixture: ComponentFixture<BoardHeaderUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardHeaderUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardHeaderUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
