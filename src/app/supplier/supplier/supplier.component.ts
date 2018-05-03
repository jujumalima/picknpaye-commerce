import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../product/product';
import { Router } from '@angular/router';
import { User } from '../../login/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  private products: Product[];
  private user: User;
  loggedInUser: string;
  constructor(private _productService: ProductService, private _router: Router, private _userService: UserService) { }

  ngOnInit() {

    this.user = new User();

    if (localStorage.getItem('currentUser') !== null) {

      this.loggedInUser = JSON.parse(localStorage.getItem('currentUser')).username;

      this._userService.getUserByUserName(this.loggedInUser)
      .subscribe((userLoggedIn) => {

        this.user = userLoggedIn;
        console.log(this.user);

        this._productService.productsBySupplier(this.user.userID)
        .subscribe((productsReturned) => {

          console.log(this.products);

          this.products = productsReturned;


        }, (error) => {
          console.log(error);
        });

      }, (error) => {

        console.log(error);

      });

    }

  }

  updateProduct(product) {

    this._productService.setter(product);
    this._router.navigate(['/update-product-badge-quantity']);

  }


}
