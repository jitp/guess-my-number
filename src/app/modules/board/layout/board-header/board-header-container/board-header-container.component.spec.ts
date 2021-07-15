import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardHeaderContainerComponent } from './board-header-container.component';

describe('BoardHeaderContainerComponent', () => {
  let component: BoardHeaderContainerComponent;
  let fixture: ComponentFixture<BoardHeaderContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardHeaderContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardHeaderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
