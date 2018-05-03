import { Component, OnInit } from '@angular/core';
import { Product } from '../../product/product';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateproductquantity',
  templateUrl: './updateproductquantity.component.html',
  styleUrls: ['./updateproductquantity.component.css']
})
export class UpdateproductquantityComponent implements OnInit {

  private product: Product;

  constructor(private _productService: ProductService, private _router: Router) { }

  ngOnInit() {

    this.product = new Product();
    this.product = this._productService.getter();
  }


  updateProductQuantity() {

    this._productService.updateProduct(this.product)
    .subscribe((data) => {

      console.log(data);

      this._router.navigate(['/supplier-panel']);

    }, (error) => {

      console.log(error);

    });



  }
}
