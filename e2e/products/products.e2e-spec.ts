import { ProductsPage } from './products.po';
import { browser } from 'protractor';

describe('products page', () => {
  let page: ProductsPage;

  beforeEach(() => {
    page = new ProductsPage();
    page.visit('/');
  });

  afterEach(() => {
  });

  it('should add products to shopping cart', () => {
    const btns = page.addToCartButton;
    const incBtns = page.incerasseQuantityButton;
    const quantity = page.cartQuantity;
    page.addProduct(btns.get(0));
    page.changeQuantity(incBtns.get(0));
    expect(quantity.getText()).toEqual('2');
  });

  it('should remove product from shopping cart', () => {
    const decBtns = page.decrasseQuantityButton;
    const quantity = page.cartQuantity;
    page.changeQuantity(decBtns.get(0));
    page.changeQuantity(decBtns.get(0));
    expect(quantity.isPresent()).toBeFalsy();
  });

  it('should add products to wishlist', () => {
    const btns = page.wishlistButton;
    const quantity = page.wishlistQuantity;
    page.visit('/login');
    browser.waitForAngular();
    page.login('test@test.pl', 'qweqwe');
    browser.waitForAngular();
    page.wishlistClick(btns.get(0));
    expect(quantity.getText()).toEqual('1');
  });

  it('should remove products to wishlist', () => {
    const btns = page.wishlistButton;
    const quantity = page.wishlistQuantity;
    browser.waitForAngular();
    page.wishlistClick(btns.get(0));
    expect(quantity.isPresent()).toBeFalsy();
  });
});
