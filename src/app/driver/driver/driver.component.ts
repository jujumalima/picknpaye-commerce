import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  viewOrders() {

    this._router.navigate(['orders-listed']);

  }

}
