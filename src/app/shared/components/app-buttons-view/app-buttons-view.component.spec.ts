import { ComponentFixture, TestBed } from '@angular/core/testing';
import {AppButtonsViewComponent} from "./app-buttons-view.component";

describe('SessionButtonsViewComponent', () => {
  let component: AppButtonsViewComponent;
  let fixture: ComponentFixture<AppButtonsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppButtonsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppButtonsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
