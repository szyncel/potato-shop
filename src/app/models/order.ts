import { ShoppingCart } from "./shopping-cart";


export class Order {
    datePlaced: number;
    items: any[];
    status:string;

    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();
        this.status="Oczekiwanie";

        this.items = shoppingCart.items.map(i => {
            return {
                product: {
                    id:i.product._id,
                    title: i.product.title,
                    price: i.product.price,
                    imgUrl: i.product.imgUrl,
                    category: i.product.category
                },
                count: i.count,
                totalPrice: i.totalPrice
            }
        })
    }

}