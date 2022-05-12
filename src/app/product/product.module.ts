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
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { ProductService } from './services/product.service';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ProductResolver } from './services/product.resolver';



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
    NgxSpinnerModule,
    NgBrazil,
    TextMaskModule,
    ImageCropperModule,

    ProductRoutingModule,

    
  ],
  providers: [
    ProductService,
    ProductResolver
  ]
})
export class ProductModule { }
