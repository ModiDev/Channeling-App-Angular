import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPaymentTemplateComponent } from './doctor-payment-template.component';

describe('DoctorPaymentTemplateComponent', () => {
  let component: DoctorPaymentTemplateComponent;
  let fixture: ComponentFixture<DoctorPaymentTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorPaymentTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorPaymentTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
