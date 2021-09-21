import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorPersonalDetailsFormComponent } from './add-doctor-personal-details-form.component';

describe('AddDoctorsFormComponent', () => {
  let component: AddDoctorPersonalDetailsFormComponent;
  let fixture: ComponentFixture<AddDoctorPersonalDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDoctorPersonalDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDoctorPersonalDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
