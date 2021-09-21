import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDrawerModalComponent } from './add-drawer-modal.component';

describe('AddDrawerModalComponent', () => {
  let component: AddDrawerModalComponent;
  let fixture: ComponentFixture<AddDrawerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDrawerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDrawerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
