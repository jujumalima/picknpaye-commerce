import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Product } from '../product';

@Component({
  selector: 'app-productlistbycategory',
  templateUrl: './productlistbycategory.component.html',
  styleUrls: ['./productlistbycategory.component.css']
})
export class ProductlistbycategoryComponent implements OnInit {

  products: Product[];
  categoryName = '';


  constructor(private _activatedRoute: ActivatedRoute, private _productService: ProductService) { }

  ngOnInit() {

    const categoryID: Number = this._activatedRoute.snapshot.params['categoryID'];
    this._productService.productListByCategory(categoryID).subscribe((productList) => {

        this.products = productList;
        console.log(productList);

        for (let index = 0; index < this.products.length; index++) {

          this.categoryName = this.products[index].category.name;
        }

      }, (error) => {

        console.log(error);

      });
  }

}
