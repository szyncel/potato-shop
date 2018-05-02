import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearCartConfirmComponent } from './clear-cart-confirm.component';

describe('ClearCartConfirmComponent', () => {
  let component: ClearCartConfirmComponent;
  let fixture: ComponentFixture<ClearCartConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearCartConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearCartConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
