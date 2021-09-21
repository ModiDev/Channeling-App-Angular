import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSessionCardViewComponent } from './active-session-card-view.component';

describe('ActiveSessionCardViewComponent', () => {
  let component: ActiveSessionCardViewComponent;
  let fixture: ComponentFixture<ActiveSessionCardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveSessionCardViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveSessionCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
