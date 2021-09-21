import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsFormModalComponent } from './payments-form-modal.component';

describe('PaymentsFormModalComponent', () => {
  let component: PaymentsFormModalComponent;
  let fixture: ComponentFixture<PaymentsFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
