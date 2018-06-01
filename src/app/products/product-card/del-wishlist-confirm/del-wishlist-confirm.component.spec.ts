import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelWishlistConfirmComponent } from './del-wishlist-confirm.component';

describe('DelWishlistConfirmComponent', () => {
  let component: DelWishlistConfirmComponent;
  let fixture: ComponentFixture<DelWishlistConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelWishlistConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelWishlistConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
