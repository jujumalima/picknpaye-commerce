import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';
import { Product } from '../product';
import { Category } from '../../category/category';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent implements OnInit {

  private product: Product;
  private category: Category;
  private categories: Category[];

  constructor(private _productService: ProductService, private _categoryService: CategoryService, private _router: Router) { }

  ngOnInit() {
    this.product = new Product();
    this.category = new Category();
    this.product.category = null;
    this.product = this._productService.getter();
    this.category = this._categoryService.getter();

    this._categoryService.getAllCategories().subscribe((categories) => {
      console.log(categories);
      this.categories = categories;
    }, (error) => {
      console.log(error);
    });


  }

  saveProduct(): void {

    if (this.product.productID === undefined) {
      this._productService.createProduct(this.product)
        .subscribe((savedProduct) => {
          console.log(savedProduct);
          this._router.navigate(['/home']);
        }, (error) => {
          console.log(error);
        });

    } else {
      this._productService.updateProduct(this.product)
        .subscribe((updatedProduct) => {
          console.log(updatedProduct);
          this._router.navigate(['/supplier-panel']);
        }, (error) => {
          console.log(error);
        });
    }
  }

}
