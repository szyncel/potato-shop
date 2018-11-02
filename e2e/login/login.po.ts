import { by, element } from 'protractor';
import { BasePage } from '../base.page';

export class LoginPo extends BasePage {

  errorMessage;
  matTab;
  registerButton;
  nameInput;
  surnameInput;
  emailInput2;
  passwordInput2;

  constructor() {
    super();
    this.errorMessage = element(by.css('mat-error'));
    this.matTab = element.all(by.css('.mat-tab-label'));
    this.nameInput = element(by.css('input[formControlName=name]'));
    this.surnameInput = element(by.css('input[formControlName=surname]'));
    this.emailInput2 = element(by.css('input[formControlName=email]'));
    this.passwordInput2 = element(by.css('input[formControlName=password]'));
    this.registerButton = element(by.buttonText('Zarejestruj'));
  }

  /** */
  navigateToRegister() {
    return this.matTab.last().click();
  }

  /** */
  navigateToLogin() {
    return this.matTab.first().click();
  }

  /** */
  register( name, surname, email, pass ) {
    this.nameInput.sendKeys(name);
    this.surnameInput.sendKeys(surname);
    this.emailInput2.sendKeys(email);
    this.passwordInput2.sendKeys(pass);
    return this.registerButton.click();
  }
}
