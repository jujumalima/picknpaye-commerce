import { Category } from '../category/category';

export class Product {
    productID: number;
    name: string;
    purchased: boolean;
    unitPrice: number;
    quantity: number;
    image: string;
    category: Category;
}
