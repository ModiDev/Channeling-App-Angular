import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsViewModalComponent } from './logs-view-modal.component';

describe('LogsViewModalComponent', () => {
  let component: LogsViewModalComponent;
  let fixture: ComponentFixture<LogsViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogsViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
