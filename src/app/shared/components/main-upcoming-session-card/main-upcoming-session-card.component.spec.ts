import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainUpcomingSessionCardComponent } from './main-upcoming-session-card.component';

describe('MainUpcomingSessionCardComponent', () => {
  let component: MainUpcomingSessionCardComponent;
  let fixture: ComponentFixture<MainUpcomingSessionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainUpcomingSessionCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainUpcomingSessionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
