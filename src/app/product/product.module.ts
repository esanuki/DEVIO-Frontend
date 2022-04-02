import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { RemoveProductComponent } from './remove-product/remove-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { ProductComponent } from './product.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductRoutingModule } from './product-routing.module';



@NgModule({
  declarations: [
    ProductComponent,
    NewProductComponent, 
    EditProductComponent, 
    RemoveProductComponent, 
    ListProductComponent, 
    DetailsProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    ProductRoutingModule
  ]
})
export class ProductModule { }
