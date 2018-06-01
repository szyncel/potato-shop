import { LoginPo } from './login.po';
import { AppPage } from '../app.po';
import { browser, by, element, protractor } from 'protractor';

describe('login/register page', () => {
  let page: LoginPo;
  let mainPage: AppPage;

  beforeEach(() => {
    page = new LoginPo();
    mainPage = new AppPage();
    page.navigateToLoginPage();
  });


  it('should init login page', () => {
    expect(page.getParagraphText()).toEqual('Witaj w Potato Shop');
  });


  it('should test failed login', () => {
    page.login('invalid_user', 'invalid_password');
    expect(page.errorMessage.isDisplayed()).toBe(true);
  });


  it('should test success login', () => {
    page.login('test@test.pl', 'qweqwe');

    expect(mainPage.getParagraphText()).toEqual('Lista dostepnych produktów');
    //
    const submit = element(by.css('.mat-simple-snackbar-action'));
    expect(submit.isDisplayed()).toBe(true);
  });


  it('should logout success', () => {
    page.logout();
    expect(mainPage.getParagraphText()).toEqual('Lista dostepnych produktów');
    const submit = element(by.css('.mat-simple-snackbar-action'));
    expect(submit.isDisplayed()).toBe(true);
  });

  it('should display message for invalid credentials', () => {
    page.navigateToregister();
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.visibilityOf(page.registerButton), 5000);//browser.waitForAngular(); ??
    page.register('Mateusz', 'Testowy', 'test@test.pl', 'qweqwe');
    expect(page.registerButton.isDisplayed()).toBe(true);
    expect(page.errorMessage.isDisplayed()).toBe(true);
  });

  /** @todo za każdym razem przed testami trzeba zmienić adres email */
  it('should show snackbar after register success and return to login panel', () => {
    page.navigateToregister();
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.visibilityOf(page.registerButton), 5000);
    page.register('Mateusz', 'Testowy', 'nowy2@email.pl', 'qweqwe');
    expect(page.registerButton.isDisplayed()).toBe(true);
    expect(page.errorMessage.isDisplayed()).toBe(true);
    const submit = element(by.css('.mat-simple-snackbar-action'));
    expect(submit.isDisplayed()).toBe(true);
  });


});
