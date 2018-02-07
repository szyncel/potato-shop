import { TestBed, inject } from '@angular/core/testing';

import { CheckoutStepsService } from './checkout-steps.service';

describe('CheckoutStepsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckoutStepsService]
    });
  });

  it('should be created', inject([CheckoutStepsService], (service: CheckoutStepsService) => {
    expect(service).toBeTruthy();
  }));
});
