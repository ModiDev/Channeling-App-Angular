import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDoctorCardComponent } from './view-doctor-card.component';

describe('ViewDoctorCardComponent', () => {
  let component: ViewDoctorCardComponent;
  let fixture: ComponentFixture<ViewDoctorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDoctorCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDoctorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
