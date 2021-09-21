import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookingButtonComponent } from './add-booking-button.component';

describe('AddBookingButtonComponent', () => {
  let component: AddBookingButtonComponent;
  let fixture: ComponentFixture<AddBookingButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookingButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
