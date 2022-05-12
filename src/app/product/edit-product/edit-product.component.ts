import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { CurrencyUtils } from 'src/app/shared/utils/currency-utils';
import { Supplier } from 'src/app/supplier/models/supplier';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { environment as env } from 'src/environments/environment';
import { SuccessMessages } from 'src/app/shared/models/success-messages';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent extends BaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  product: Product;
  suppliers: Supplier[];

  imageUrl: string = env.imagensUrl;
  imagePreview: any;
  imageBase64: any;
  imageName: string;
  imageOriginalSrc: string;
  
  constructor(
    router: Router,
    toastr: ToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private spinner: NgxSpinnerService
  ) { 
    super(toastr, router);

    this.product = this.route.snapshot.data['produto'];
  }

  ngOnInit(): void {
    this.productService.getSuppliers()
      .subscribe(data => this.suppliers = data);

    this.form = this.fb.group({
      fornecedorId: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      imagem: [''],
      valor: ['', [Validators.required]],
      ativo: [0]
    });

    this.form.patchValue({
      fornecedorId: this.product.fornecedorId,
      id: this.product.id,
      nome: this.product.nome,
      descricao: this.product.descricao,
      valor: CurrencyUtils.DecimalToString(this.product.valor),
      ativo: this.product.ativo
    });
    console.log(CurrencyUtils.DecimalToString(this.product.valor));
    this.imageOriginalSrc = this.imageUrl + '/' +this.product.imagem;

  }

  edit() {
    if (this.form.dirty && this.form.valid) {
      this.spinner.show();

      this.product = Object.assign({}, this.product, this.form.value);

      if (this.imageBase64){
        this.product.imagemUpload = this.imageBase64;
        this.product.imagem = this.imageName;
      }

      this.product.valor = CurrencyUtils.StringToDecimal(this.product.valor);

      this.productService.editProduct(this.product)
        .subscribe(data => {
          this.spinner.hide();
          this.processSuccess(data);
        },
        error => {
          this.spinner.hide();
          this.processFail(error)
        });

      this.changesNotSaves = false;
    }
  }

  processSuccess(response: any): void {
    super.processSuccess({message: 'Produto atualizado com sucesso!', title: 'Sucesso'}, '/product/list-product');
  }

  upload(file: any){
    this.imageName = file[0].name;

    var reader = new FileReader();
    reader.onload = this.handleReader.bind(this);
    reader.readAsBinaryString(file[0]);
  }

  handleReader(reader: any){
    var bynaryString = reader.target.result;
    this.imageBase64 = btoa(bynaryString);
    this.imagePreview = 'data:image/jpeg;base64,' + this.imageBase64;
  }

}
