import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveItemConfirmComponent } from './remove-item-confirm.component';

describe('RemoveItemConfirmComponent', () => {
  let component: RemoveItemConfirmComponent;
  let fixture: ComponentFixture<RemoveItemConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveItemConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveItemConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
