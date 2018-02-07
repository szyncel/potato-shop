import { Injectable } from '@angular/core';

@Injectable()
export class CheckoutStepsService {
  private STEPS = [
    { step: 'checkout/address', valid: true },
    { step: 'checkout/confirm', valid: false }
  ];

  validateSteps(step: string) {
    console.log('test:', step);
    var found = false;
    for (var i = 0; i < this.STEPS.length && !found; i++) {
      if (this.STEPS[i].step === step) {
        found = this.STEPS[i].valid = true;
      };
    };
  };


  checkStep(step: string) {
    var found = false;
    this.STEPS.filter(s => {
      if (s.step == step) {
        found = s.valid;
      };
    });
    return found;
  }

  resetSteps() {
    this.STEPS.forEach(element => {
      element.valid = false;
    });
  };


}
