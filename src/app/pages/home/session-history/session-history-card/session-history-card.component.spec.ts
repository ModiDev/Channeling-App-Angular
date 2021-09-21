import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionHistoryCardComponent } from './session-history-card.component';

describe('SessionHistoryCardComponent', () => {
  let component: SessionHistoryCardComponent;
  let fixture: ComponentFixture<SessionHistoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionHistoryCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionHistoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
