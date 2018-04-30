/** @deprecated use Product from /store/models */
export class Product {
  _id: string;
  title: string;
  category: string;
  price: number;
  imgUrl: string;

  constructor() {
    this._id = ''
    this.title = '';
    this.category = '';
    this.price = null;
    this.imgUrl = '';
  }
}
