import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier/supplier.component';

@NgModule({
  imports: [
    CommonModule,
    SupplierRoutingModule
  ],
  declarations: [SupplierComponent]
})
export class SupplierModule { }
