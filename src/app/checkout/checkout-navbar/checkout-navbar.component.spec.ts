import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutNavbarComponent } from './checkout-navbar.component';

describe('CheckoutNavbarComponent', () => {
  let component: CheckoutNavbarComponent;
  let fixture: ComponentFixture<CheckoutNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
