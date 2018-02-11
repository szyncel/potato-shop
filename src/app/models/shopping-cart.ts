import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";



export class ShoppingCart {
    items: ShoppingCartItem[]=[];
    constructor(itemsMap: ShoppingCartItem[]) {
        for(let prodId in itemsMap){
            let item= itemsMap[prodId];
            this.items.push(new ShoppingCartItem(item.product, item.count));
        }
        
     }

    getQuantity(product:Product) {
        let itemArray = this.items;
        let item = itemArray.filter(item => item.product._id == product._id);//add '_id' to product interface
        return item[0] ? item[0].count : 0;
      }

    get totalItemsCount() {
        let shoppingCartItemCount = 0;
        for (let prodId in this.items) {
            shoppingCartItemCount += this.items[prodId].count;
        };

        return shoppingCartItemCount;
    }

    get totalPrice() {
        let sum = 0;
        for (let prodId in this.items) {
            if (this.items[prodId].count !== 0) {
                sum += (this.items[prodId].product.price*this.items[prodId].count);
            }

        };
        return sum;
    }
}