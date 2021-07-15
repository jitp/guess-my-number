import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighScoreContainerComponent } from './high-score-container.component';

describe('HighScoreContainerComponent', () => {
  let component: HighScoreContainerComponent;
  let fixture: ComponentFixture<HighScoreContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighScoreContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighScoreContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
