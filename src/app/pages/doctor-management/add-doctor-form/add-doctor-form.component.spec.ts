import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorFormComponent } from './add-doctor-form.component';

describe('AddDoctorFormComponent', () => {
  let component: AddDoctorFormComponent;
  let fixture: ComponentFixture<AddDoctorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDoctorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDoctorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
