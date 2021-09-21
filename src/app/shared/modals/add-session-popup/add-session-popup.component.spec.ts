import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSessionPopupComponent } from './add-session-popup.component';

describe('AddSessionPopupComponent', () => {
  let component: AddSessionPopupComponent;
  let fixture: ComponentFixture<AddSessionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSessionPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSessionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
