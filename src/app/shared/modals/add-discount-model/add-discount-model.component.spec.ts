import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiscountModelComponent } from './add-discount-model.component';

describe('AddDiscountModelComponent', () => {
  let component: AddDiscountModelComponent;
  let fixture: ComponentFixture<AddDiscountModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDiscountModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiscountModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
