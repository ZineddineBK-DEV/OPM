import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDaliComponent } from './test-dali.component';

describe('TestDaliComponent', () => {
  let component: TestDaliComponent;
  let fixture: ComponentFixture<TestDaliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDaliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
