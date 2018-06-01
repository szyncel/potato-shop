import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistButtonComponent } from './wishlist-button.component';

describe('WishlistButtonComponent', () => {
  let component: WishlistButtonComponent;
  let fixture: ComponentFixture<WishlistButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
