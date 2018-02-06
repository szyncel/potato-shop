import { Product } from "./product";


export class ShoppingCartItem {
    constructor(
        public product: Product,
        public count: number
    ) { }


    // price:number;
    // category:String;
    // imgUrl:String;

    get totalPrice() {
        return this.count * this.product.price;
    }
}