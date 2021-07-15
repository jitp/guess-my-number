import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardLayoutContainerComponent } from './board-layout-container.component';

describe('BoardLayoutContainerComponent', () => {
  let component: BoardLayoutContainerComponent;
  let fixture: ComponentFixture<BoardLayoutContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardLayoutContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardLayoutContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
