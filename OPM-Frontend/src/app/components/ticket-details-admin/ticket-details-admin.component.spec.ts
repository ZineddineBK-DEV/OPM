import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDetailsAdminComponent } from './ticket-details-admin.component';

describe('TicketDetailsAdminComponent', () => {
  let component: TicketDetailsAdminComponent;
  let fixture: ComponentFixture<TicketDetailsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketDetailsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
