import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardLayoutUiComponent } from './board-layout-ui.component';

describe('BoardLayoutUiComponent', () => {
  let component: BoardLayoutUiComponent;
  let fixture: ComponentFixture<BoardLayoutUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardLayoutUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardLayoutUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
