import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdservComponent } from './prodserv.component';

describe('ProdservComponent', () => {
  let component: ProdservComponent;
  let fixture: ComponentFixture<ProdservComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdservComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdservComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
