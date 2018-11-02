import { LoginPo } from './login.po';
import { browser, protractor } from 'protractor';
import * as faker from 'faker';

describe('login/register page', () => {
  let page: LoginPo;

  beforeEach(() => {
    page = new LoginPo();
    page.visit('/login');
  });

  it('should test failed login', () => {
    page.login('invalid_user', 'invalid_password');
    expect(page.errorMessage.isDisplayed()).toBe(true);
  });

  it('should test success login', () => {
    page.login('test@test.pl', 'qweqwe');
    expect(page.getParagraphText()).toEqual('Lista dostepnych produktów');
    expect(page.snackBar.isDisplayed()).toBe(true);
  });

  it('should logout success', () => {
    page.logout();
    expect(page.getParagraphText()).toEqual('Lista dostepnych produktów');
    expect(page.snackBar.isDisplayed()).toBe(true);
  });

  it('should display message for invalid credentials', () => {
    page.navigateToRegister();
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.visibilityOf(page.registerButton), 5000);
    page.register('Mateusz', 'Testowy', 'test@test.pl', 'qweqwe');
    expect(page.registerButton.isDisplayed()).toBe(true);
    expect(page.errorMessage.isDisplayed()).toBe(true);
  });

  it('should show snackbar after register success and return to login panel', () => {
    page.navigateToRegister();
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.visibilityOf(page.registerButton), 5000);
    const randomEmail = faker.internet.email();
    page.register('Mateusz', 'Testowy', randomEmail, 'qweqwe');
    expect(page.snackBar.isDisplayed()).toBe(true);
  });
});
