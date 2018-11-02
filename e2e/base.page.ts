import { browser, by, element, protractor } from 'protractor';

export class BasePage {

  snackBar;
  emailInput;
  passInput;
  submitButton;
  test;

  constructor() {
    this.snackBar = element(by.css('.mat-simple-snackbar-action'));
    this.test = element(by.css('.mat-simple-snackbar'));
    this.emailInput = element(by.css('input[formControlName=Email]'));
    this.passInput = element(by.css('input[formControlName=Haslo]'));
    this.submitButton = element(by.buttonText('Zaloguj'));
  }

  visit( url ) {
    return browser.get(url);
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getSnackBarText() {
    return this.test.getText();
  }

  login( user, pass ) {
    this.emailInput.sendKeys(user);
    this.passInput.sendKeys(pass);
    this.submitButton.click();
  }

  logout() {
    const EC = protractor.ExpectedConditions;
    element(by.id('myMenu')).click();
    browser.sleep(500);
    const waitFor = element(by.id('logout'));
    browser.wait(EC.visibilityOf(waitFor), 5000);
    return waitFor.click();
  }
}
