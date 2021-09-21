import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerLogsModalComponent } from './drawer-logs-modal.component';

describe('DrawerLogsModalComponent', () => {
  let component: DrawerLogsModalComponent;
  let fixture: ComponentFixture<DrawerLogsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawerLogsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerLogsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
