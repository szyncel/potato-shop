import { AdminProductsPage } from './admin-products.po';
import { browser, by, element } from 'protractor';
import * as faker from 'faker';

describe('Admin products page', () => {
  let page: AdminProductsPage;

  beforeEach(() => {
    page = new AdminProductsPage();
    page.visit('/admin/products');
  });

  afterEach(() => {
    page.logout();
  });

  it('should add product', () => {
    const product = {
      title: faker.commerce.product(),
      category: 'stary',
      price: '123',
      imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTde-W7pUT1z_9wYU79Wa-g0ucTyNeekgS91FRqmh7OTKTwgzz9'
    };
    page.login('test@test.pl', 'qweqwe');
    browser.waitForAngular();
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
    const product = {
      title: faker.commerce.product(),
      category: 'młody',
    };
    page.login('test@test.pl', 'qweqwe');
    browser.waitForAngular();
    page.openEditDialog();
    page.editProduct(product);
    browser.waitForAngular();
    const rows = element.all(by.css('.mat-row')).first();
    const cells = rows.all(by.css('mat-cell'));
    expect(cells.get(0).getText()).toEqual(product.title);
    expect(cells.get(2).getText()).toEqual(product.category);
  });

  it('should delete first product from list', () => {
    page.login('test@test.pl', 'qweqwe');
    browser.waitForAngular();
    const rows = element.all(by.css('.mat-row')).first();
    const cells = rows.all(by.css('mat-cell'));
    const oldTitle = cells.get(0).getText();
    page.openDeleteDialog();
    page.removeProduct();
    browser.waitForAngular();
    expect(oldTitle).not.toEqual(cells.get(0).getText());
  });
});
