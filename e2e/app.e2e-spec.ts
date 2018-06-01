import { AppPage } from './app.po';

describe('potato-shop App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Lista dostepnych produktów');
  });

  it('should navigate to wishlist', () => {
    page.navigateToWishlist();
    expect(page.getParagraphText()).toEqual('Zaloguj sie aby mieć dostęp do listy życzeń');
  });

});
