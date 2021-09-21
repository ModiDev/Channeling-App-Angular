import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutViewModalComponent } from './logout-view-modal.component';

describe('LogoutViewModalComponent', () => {
  let component: LogoutViewModalComponent;
  let fixture: ComponentFixture<LogoutViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
