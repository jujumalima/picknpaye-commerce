import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../product/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  private products: Product[];
  constructor(private _productService: ProductService, private _router: Router) { }

  ngOnInit() {

    this._productService.getAllProducts()
      .subscribe((productsReturned) => {

        this.products = productsReturned;

      }, (error) => {
        console.log(error);
      });
  }

  updateProduct(product) {

    this._productService.setter(product);
    this._router.navigate(['/add-product']);

  }


}
