import { ProductsPage } from './products.po';
import { LoginPo } from '../login/login.po';

describe('products page', () => {
  let page: ProductsPage;
  let loginPage: LoginPo;

  beforeEach(() => {
    page = new ProductsPage();
    loginPage = new LoginPo();
    page.navigateTo();
  });

  /** @TODO rozbić na dwa testy */
  it('should add products to shopping cart', () => {
    const btns = page.addToCartButton;
    const incBtns = page.incerasseQuantityButton;
    const decBtns = page.decrasseQuantityButton;
    const quantity = page.cartQuantity;

    page.addProduct(btns.get(0)).then(() => {
      return page.addProduct(btns.get(0));
    });
    page.changeQuantity(incBtns.get(0));
    page.changeQuantity(incBtns.get(0));
    page.changeQuantity(incBtns.get(1));
    page.changeQuantity(decBtns.get(1));
    expect(quantity.getText()).toEqual('4');
  });


  /** @TODO rozbić na dwa testy */
  it('should add and remove product to wishlist', () => {
    /** 1.Login
     *  2. Add first product to wishlist
     *  3. Add second product to wishlist
     *  4. Remove first product from wishlist */
    const btns = page.wishlistButton;
    const quantity = page.wishlistQuantity;
    loginPage.navigateToLoginPage();
    loginPage.login('test@test.pl', 'qweqwe');
    page.wishlistClick(btns.get(0));
    page.wishlistClick(btns.get(1)).then(() => {
      page.wishlistClick(btns.get(1));
    });
    expect(quantity.getText()).toEqual('1');
  });

});
