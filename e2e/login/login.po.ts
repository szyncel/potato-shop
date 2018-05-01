import { $, browser, by, element } from 'protractor';

export class LoginPo {
  userInput;
  passInput;
  submitButton;
  errorMessage;
  matTab;
  registerButton;
  nameInput;
  surnameInput;
  emailInput2;
  passwordInput2;
  registerErrors;

  constructor() {
    this.userInput = element(by.css('input[formControlName=Email]'));
    this.passInput = element(by.css('input[formControlName=Haslo]'));
    this.submitButton = element(by.buttonText('Zaloguj'));
    this.errorMessage = element(by.css('mat-error'));

    this.matTab = element.all(by.css('.mat-tab-label')); //mamy to!
    this.nameInput = element(by.css('input[formControlName=name]'));
    this.surnameInput = element(by.css('input[formControlName=surname]'));
    this.emailInput2 = element(by.css('input[formControlName=email]'));
    this.passwordInput2 = element(by.css('input[formControlName=password]'));
    this.registerButton = element(by.buttonText('Zarejestruj'));
    //this.registerErrors = element(by.css('mat-error'));


  }

  navigateToLoginPage() {
    return browser.get('/login');
  }

  navigateToregister() {
    return this.matTab.last().click();
  }

  navigateToLogin(){
    return this.matTab.first().click();
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  login( user, pass ) {
    this.userInput.sendKeys(user);
    this.passInput.sendKeys(pass);
    return this.submitButton.click();
  }


  register( name, surname, email, pass ) {
    this.nameInput.sendKeys(name);
    this.surnameInput.sendKeys(surname);
    this.emailInput2.sendKeys(email);
    this.passwordInput2.sendKeys(pass);
    return this.registerButton.click();
  }

}
