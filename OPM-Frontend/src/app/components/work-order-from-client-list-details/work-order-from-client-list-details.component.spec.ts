import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderFromClientListDetailsComponent } from './work-order-from-client-list-details.component';

describe('WorkOrderFromClientListDetailsComponent', () => {
  let component: WorkOrderFromClientListDetailsComponent;
  let fixture: ComponentFixture<WorkOrderFromClientListDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderFromClientListDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderFromClientListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
