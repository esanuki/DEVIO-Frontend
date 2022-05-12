import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  imgs: string = env.imagensUrl;
  products: Product[];
  errorMessage: string;

  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();

    this.productService.getAll()
      .subscribe(data => {
        this.spinner.hide();
        this.products = data;
      },
      error => {
        this.spinner.hide();
      })
  }

}
