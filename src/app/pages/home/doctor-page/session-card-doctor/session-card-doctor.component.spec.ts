import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionCardDoctorComponent } from './session-card-doctor.component';

describe('SessionCardDoctorComponent', () => {
  let component: SessionCardDoctorComponent;
  let fixture: ComponentFixture<SessionCardDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionCardDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionCardDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
