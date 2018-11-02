import { by, element } from 'protractor';
import { BasePage } from '../base.page';

export class ProductsPage extends BasePage {

  addToCartButton;
  incerasseQuantityButton;
  decrasseQuantityButton;
  wishlistButton;
  cartQuantity;
  wishlistQuantity;

  constructor() {
    super();
    this.addToCartButton = element.all(by.id('add'));
    this.cartQuantity = element(by.css('.mat-chip'));
    this.incerasseQuantityButton = element.all(by.css('.inc'));
    this.decrasseQuantityButton = element.all(by.css('.dec'));
    this.wishlistButton = element.all(by.css('.wishlist'));
    this.wishlistQuantity = element.all(by.css('.mat-chip')).first();
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
