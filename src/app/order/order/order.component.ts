import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { Router } from '@angular/router';
import { Product } from '../../product/product';
import { Customer } from '../../customer/customer';
import { Order } from '../order';
import { CustomerService } from '../../service/customer.service';
import { CartItem } from '../../cartitem/cart-item';
import { LoginService } from '../../service/login.service';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  cartItems: CartItem[];
  products = new Array();
  product: Product;
  private customer: Customer;
  private order: Order;
  loggedInCustomer: string;
  cartGrandTotal: number;
  currentDate: Date;
  currentTime: Date;
  numberOrder: number;
  productsFromDatabase: Product[];
  productToBeUpdated: Product;
  updatedQuantity: number;

  // tslint:disable-next-line:max-line-length
  constructor(private _orderService: OrderService, private _router: Router, private _customerService: CustomerService, private _loginService: LoginService, private _productService: ProductService) { }

  ngOnInit() {

    this.customer = new Customer();
    this.product = new Product();
    this.order = new Order();
    this.productToBeUpdated = new Product();

    this.getLoggedInCustomer();
    this.getCartItems();
    this.getCartGrandTotal();
    this.getCurrentDate();
    this.getCurrentTime();

  }

  getProductsFromCartItems(): Product[] {

    for (let index = 0; index < this.cartItems.length; index++) {

      if (this.cartItems.length !== 0) {

        this.product = this.cartItems[index].product;
        this.products.push(this.product);

      }

    }

    return this.products;

  }

  returnOrderNumber(): number {

    return this.customer.userID;
  }

  getCurrentTime(): Date {

    return this.currentTime = new Date();

  }


  getLoggedInCustomer() {

    if (localStorage.getItem('currentUser') != null) {

      this.loggedInCustomer = JSON.parse(localStorage.getItem('currentUser')).username;

      this._customerService.getCustomerByUserName(this.loggedInCustomer)
        .subscribe((customerLoggedIn) => {

          console.log(customerLoggedIn);

          this.customer = customerLoggedIn;
          this.numberOrder = this.customer.userID;

        }, (error) => {

          console.log(error);

        });
    } else {
      this._router.navigate(['/user-login']);
    }
  }

  getCartItems() {

    if (localStorage.getItem('cartItems') != null) {

      this.cartItems = JSON.parse(localStorage.getItem('cartItems')).items;
      console.log(this.cartItems);

    } else {

      this._router.navigate(['/user-login']);
    }

  }

  getCartGrandTotal(): number {

    if (localStorage.getItem('cartGrandTotal') != null) {

      this.cartGrandTotal = JSON.parse(localStorage.getItem('cartGrandTotal'));
      console.log(this.cartGrandTotal);

    } else {

      this._router.navigate(['/user-login']);

    }

    return this.cartGrandTotal;
  }

  getAllProductsFromDatabase() {

    this._productService.getAllProducts()
      .subscribe((ps) => {
        this.productsFromDatabase = ps;
      }, (error) => {
        console.log(error);
      });

  }

  subtractProductQuantity() {

    for (let index = 0; index < this.cartItems.length; index++) {

      if (JSON.parse(this.productsFromDatabase[index].name) === JSON.parse(this.cartItems[index].product.name)) {

        this.updatedQuantity = this.productsFromDatabase[index].quantity - this.cartItems[index].count;

        this.productToBeUpdated.quantity = this.updatedQuantity;
        this.productToBeUpdated.category = this.cartItems[index].product.category;
        this.productToBeUpdated.image = this.cartItems[index].product.image;
        this.productToBeUpdated.name = this.cartItems[index].product.name;
        this.productToBeUpdated.productID = this.cartItems[index].product.productID;
        this.productToBeUpdated.purchased = true;
        this.productToBeUpdated.unitPrice = this.cartItems[index].product.unitPrice;

        this._productService.updateProduct(this.productToBeUpdated)
          .subscribe((data) => {

            console.log('Before quantity ' + this.productsFromDatabase[index].quantity);
            console.log('After quantity ' + this.cartItems[index].product.quantity);

          }, (error) => {

            console.log(error);

          });
      }

    }

  }

  createOrder() {

    this.order.amount = this.getCartGrandTotal();
    this.order.delivered = 'No';
    this.order.dateCreated = new Date();
    this.order.orderNumber = this.customer.userID;
    this.order.userID = this.customer.userID;
    this.order.fullNames = this.customer.fullNames;
    this.order.houseNo = this.customer.houseNo;
    this.order.area = this.customer.surburb;

    this._orderService.createOrder(this.order)
      .subscribe((data) => {

        console.log(data);
        console.log(this.order);
        console.log('Thank you ' + this.customer.fullNames + ' Please come again!!');
        alert('Thank you ' + this.customer.fullNames + ' Please come again!!');
        this._loginService.logout();
        this._router.navigate(['/home']);

      }, (error) => {

        console.log(error);

      });

      this.subtractProductQuantity();
  }

  getCurrentDate(): Date {


    return this.currentDate = new Date();


  }

}
