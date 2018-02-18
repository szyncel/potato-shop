import { WishlistItem } from "./wishlist-item";


export class Wishlist {
    items: WishlistItem[] = [];
    constructor(itemsMap: WishlistItem[]) {
        for(let prodId in itemsMap){
            let item= itemsMap[prodId];
            this.items.push(new WishlistItem(item.product));
        }
    }


    get totalItemsCount() {
        let shoppingCartItemCount = 0;
        for (let prodId in this.items) {
            shoppingCartItemCount += 1;
        };

        return shoppingCartItemCount;
    }

}