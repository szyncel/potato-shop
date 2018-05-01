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
    const EC = protractor.ExpectedConditions;
    page.login('test@test.pl', 'qweqwe');
    // expect(page.errorMessage.isDisplayed()).toBe(true);
    // console.log(submit.getText());

    expect(mainPage.getParagraphText()).toEqual('Lista dostepnych produktów');
    //
    const submit = element(by.css('.mat-simple-snackbar-action'));
    expect(submit.isDisplayed()).toBe(true);
  });


  it('should logout success', () => {
    const EC = protractor.ExpectedConditions;
    const test = element(by.id('myMenu'));
    test.click();
    browser.sleep(500);
    const waitFor = element(by.id('logout'));
    browser.wait(EC.visibilityOf(waitFor), 5000);
    waitFor.click();
    expect(mainPage.getParagraphText()).toEqual('Lista dostepnych produktów');
    //should show snackbar;
  });

  it('should display message for invalid credentials', () => {
    page.navigateToregister();
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.visibilityOf(page.registerButton), 5000);
    // browser.sleep(1000);
    page.register('Mateusz', 'Testowy', 'test@test.pl', 'qweqwe');
    expect(page.registerButton.isDisplayed()).toBe(true);
    expect(page.errorMessage.isDisplayed()).toBe(true);
  });


  it('should show snackbar after register success and return to login panel', () => {
    page.navigateToregister();
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.visibilityOf(page.registerButton), 5000);
    page.register('Mateusz', 'Testowy', 'nowy2@email.pl', 'qweqwe');
    expect(page.registerButton.isDisplayed()).toBe(true);
    expect(page.errorMessage.isDisplayed()).toBe(true);
    const submit = element(by.css('.mat-simple-snackbar-action'));
    expect(submit.isDisplayed()).toBe(true);
    // submit.click();
  });


});
