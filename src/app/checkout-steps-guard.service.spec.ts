import { TestBed, inject } from '@angular/core/testing';

import { CheckoutStepsGuardService } from './checkout-steps-guard.service';

describe('CheckoutStepsGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckoutStepsGuardService]
    });
  });

  it('should be created', inject([CheckoutStepsGuardService], (service: CheckoutStepsGuardService) => {
    expect(service).toBeTruthy();
  }));
});
