import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreUiComponent } from './score-ui.component';

describe('ScoreUiComponent', () => {
  let component: ScoreUiComponent;
  let fixture: ComponentFixture<ScoreUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
