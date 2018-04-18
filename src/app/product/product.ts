import { Category } from '../category/category';

export class Product {
    productID: Number;
    name: string;
    purchased: boolean;
    unitPrice: Number;
    quantity: Number;
    image: string;
    category: Category;
}
