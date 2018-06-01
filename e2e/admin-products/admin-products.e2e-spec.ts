import { AdminProductsPage } from './admin-products.po';
import { LoginPo } from '../login/login.po';
import { browser, by, element } from 'protractor';

fdescribe('Admin products page', () => {
  let page: AdminProductsPage;
  let loginPage: LoginPo;

  beforeEach(() => {
    page = new AdminProductsPage();
    loginPage = new LoginPo();
  });

  it('should add product', () => {

    /** @todo zmiana nazwy przy nowym teście */
    const product = {
      title: 'Test16',
      category: 'stary',
      price: '123',
      imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTde-W7pUT1z_9wYU79Wa-g0ucTyNeekgS91FRqmh7OTKTwgzz9'
    };

    loginPage.navigateToLoginPage();
    loginPage.login('test@test.pl', 'qweqwe');
    browser.waitForAngular();
    page.navigateToAdminProducts();
    page.openAddDialog();
    page.addProduct(product);
    browser.waitForAngular();
    const rows = element.all(by.css('.mat-row')).first();
    const cells = rows.all(by.css('mat-cell'));
    expect(cells.get(0).getText()).toEqual(product.title);
    expect(cells.get(1).getText()).toEqual(product.price + ' zł');
    expect(cells.get(2).getText()).toEqual(product.category);
  });


  it('should edit product', () => {

    /** @todo zmiana nazwy przy nowym teście */
    const product = {
      title: 'Test16_Edit',
      category: 'młody',
    };
    loginPage.navigateToLoginPage();
    loginPage.login('test@test.pl', 'qweqwe');
    browser.waitForAngular();
    page.navigateToAdminProducts();
    page.openEditDialog();
    page.editProduct(product);
    browser.waitForAngular();
    const rows = element.all(by.css('.mat-row')).first();
    const cells = rows.all(by.css('mat-cell'));
    expect(cells.get(0).getText()).toEqual(product.title);
    expect(cells.get(2).getText()).toEqual(product.category);
  });

  it('should delete first product from list', () => {

    loginPage.navigateToLoginPage();
    loginPage.login('test@test.pl', 'qweqwe');
    browser.waitForAngular();
    page.navigateToAdminProducts();

    const rows = element.all(by.css('.mat-row')).first();
    const cells = rows.all(by.css('mat-cell'));
    const oldTitle = cells.get(0).getText();
    page.openDeleteDialog();
    page.removeProduct();
    browser.waitForAngular();
    expect(oldTitle).not.toEqual(cells.get(0).getText());
  });

});
