import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { ToastrService } from 'ngx-toastr';
import { environment as env } from 'src/environments/environment';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-remove-product',
  templateUrl: './remove-product.component.html',
  styleUrls: ['./remove-product.component.css']
})
export class RemoveProductComponent implements OnInit {

  image: string = env.imagensUrl;
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private productService: ProductService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.product = this.route.snapshot.data['produto'];
  }

  remove(){
    this.spinner.show();
    this.productService.removeProduct(this.product.id)
      .subscribe(data => {
        this.spinner.hide();
        this.success(data);
      },
      error => {
        this.spinner.hide();
        this.fail();
      })
  }

  private success(event: any) {
    const toast = this.toastr.success('Produto excluido com Sucesso!', 'Adious');
    if (toast) {
      toast.onHidden.subscribe(() => this.router.navigate(['/product/list-product']));
    }
  }

  private fail() {
    this.toastr.error('Houve um erro no processamento!', 'Ops!');
  }

}
