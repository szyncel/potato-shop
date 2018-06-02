import { $, browser, by, element } from 'protractor';
import { BasePage } from '../base.page';

export class AdminProductsPage extends BasePage {

  /** */
  newButton;
  /** */
  addProductButton;
  /** */
  editButtons;
  /** */
  editProductButton;
  /** */
  deleteButtons;
  /** */
  deleteProductButton;
  /** */
  confirmCheckBox;
  /** */
  titleInput;
  /** */
  categorySelectInput;
  /** */
  priceInput;
  /** */
  imgInput;
  /** */
  rows;

  constructor() {
    super();
    this.newButton = element(by.id('add'));
    this.titleInput = element(by.css('input[formControlName=title]'));
    this.categorySelectInput = element(by.name('category'));
    this.priceInput = element(by.css('input[formControlName=price]'));
    this.imgInput = element(by.css('input[formControlName=imgUrl]'));
    this.addProductButton = element(by.id('addProduct'));
    this.editProductButton = element(by.id('editProduct'));
    this.editButtons = element.all(by.css('.edit')).first();
    this.deleteButtons = element.all(by.css('.delete')).first();
    this.confirmCheckBox = element(by.css('.mat-checkbox'));
    this.deleteProductButton = element(by.id('deleteProduct'));
    this.rows = element.all(by.css('.mat-row')).first();
  }

  /** */
  openAddDialog() {
    this.newButton.click(); // open dialog
  }

  /** */
  openEditDialog() {
    this.editButtons.click();
  }

  /** */
  openDeleteDialog() {
    this.deleteButtons.click();
  }

  /** */
  addProduct( product ) {
    this.titleInput.sendKeys(product.title); // form
    this.categorySelectInput.click();
    $(`.mat-option[ng-reflect-value="stary"]`).click();
    this.priceInput.sendKeys(product.price);
    this.imgInput.sendKeys(product.imgUrl);
    return this.addProductButton.click();
  }

  /** */
  editProduct( product ) {
    this.titleInput.clear().then(() => {
      this.titleInput.sendKeys(product.title);
    });
    this.categorySelectInput.click();
    $(`.mat-option[ng-reflect-value=${product.category}]`).click();
    return this.editProductButton.click();
  }

  /** */
  removeProduct() {
    this.confirmCheckBox.click();
    browser.sleep(1000);
    this.deleteProductButton.click();
  }

}
