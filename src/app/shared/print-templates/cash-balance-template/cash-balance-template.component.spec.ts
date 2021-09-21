import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashBalanceTemplateComponent } from './cash-balance-template.component';

describe('CashBalanceTemplateComponent', () => {
  let component: CashBalanceTemplateComponent;
  let fixture: ComponentFixture<CashBalanceTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashBalanceTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashBalanceTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
