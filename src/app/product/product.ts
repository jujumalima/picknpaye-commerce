import { Category } from '../category/category';

export class Product {
    productID: Number;
    name: string;
    purchased: boolean;
    unitPrice: Number;
    quantity: number;
    image: string;
    category: Category;
}
