import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSupplierComponent } from './new-supplier/new-supplier.component';
import { EditSupplierComponent } from './edit-supplier/edit-supplier.component';
import { RemoveSupplierComponent } from './remove-supplier/remove-supplier.component';
import { DetailsSupplierComponent } from './details-supplier/details-supplier.component';
import { ListSupplierComponent } from './list-supplier/list-supplier.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SupplierComponent } from './supplier.component';
import { SupplierRoutingModule } from './supplier-routing.module';



@NgModule({
  declarations: [
    SupplierComponent,
    NewSupplierComponent, 
    EditSupplierComponent, 
    RemoveSupplierComponent, 
    DetailsSupplierComponent, 
    ListSupplierComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    SupplierRoutingModule
  ]
})
export class SupplierModule { }
