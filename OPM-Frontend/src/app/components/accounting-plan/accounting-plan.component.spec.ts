import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingPlanComponent } from './accounting-plan.component';

describe('AccountingPlanComponent', () => {
  let component: AccountingPlanComponent;
  let fixture: ComponentFixture<AccountingPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
