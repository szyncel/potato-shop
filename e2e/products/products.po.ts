import { browser, by, element } from 'protractor';

export class ProductsPage {

  addToCartButton;

  incerasseQuantityButton;

  decrasseQuantityButton;

  wishlistButton;

  cartQuantity;

  wishlistQuantity;

  constructor() {
    this.addToCartButton = element.all(by.id('add'));
    this.cartQuantity = element(by.css('.mat-chip'));
    this.incerasseQuantityButton = element.all(by.css('.inc'));
    this.decrasseQuantityButton = element.all(by.css('.dec'));
    this.wishlistButton = element.all(by.css('.wishlist'));
    this.wishlistQuantity = element.all(by.css('.mat-chip')).first();
  }

  navigateTo() {
    return browser.get('/');
  }

  addProduct( product ) {
    return product.click();
  }

  changeQuantity( product ) {
    return product.click();
  }

  wishlistClick( product ) {
    return product.click();
  }


}
