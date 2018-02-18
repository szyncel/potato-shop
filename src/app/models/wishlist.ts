import { WishlistItem } from "./wishlist-item";


export class Wishlist {
    items: WishlistItem[] = [];
    constructor(itemsMap: WishlistItem[]) {
        for(let prodId in itemsMap){
            let item= itemsMap[prodId];
            this.items.push(new WishlistItem(item.product));
        }
    }

}