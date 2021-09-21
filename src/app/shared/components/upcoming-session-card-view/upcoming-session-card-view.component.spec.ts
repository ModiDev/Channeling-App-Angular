import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingSessionCardViewComponent } from './upcoming-session-card-view.component';

describe('UpcomingSessionCardViewComponent', () => {
  let component: UpcomingSessionCardViewComponent;
  let fixture: ComponentFixture<UpcomingSessionCardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingSessionCardViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingSessionCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
