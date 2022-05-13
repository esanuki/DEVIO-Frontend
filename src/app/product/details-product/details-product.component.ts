import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment as env } from 'src/environments/environment';
import { Product } from '../models/product';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {

  image: string = env.imagensUrl;
  product: Product;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.product = this.route.snapshot.data['produto'];
  }

}
