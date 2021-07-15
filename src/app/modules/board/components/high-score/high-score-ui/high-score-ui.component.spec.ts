import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighScoreUirComponent } from './high-score-ui.component';

describe('HighScoreUirComponent', () => {
  let component: HighScoreUirComponent;
  let fixture: ComponentFixture<HighScoreUirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighScoreUirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighScoreUirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
