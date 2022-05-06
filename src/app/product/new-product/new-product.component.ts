import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { CurrencyUtils } from 'src/app/shared/utils/currency-utils';
import { Supplier } from 'src/app/supplier/models/supplier';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent extends BaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

  suppliers: Supplier[] = [];
  product: Product;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imageURL: string;
  imageName: string;
  
  constructor(
    router: Router,
    toastr: ToastrService,
    private fb: FormBuilder,
    private productService: ProductService,
    private spinner: NgxSpinnerService
  ) { 
    super(toastr, router);

    this.validationMessages = {
      fornecedorId: {
        required: 'Escolha um fornecedor'
      },
      nome: {
        required: 'Informe o Nome',
        minlength: 'Mínimo de 2 caracteres',
        maxlength: 'Máximo de 200 caracteres'
      },
      descricao: {
        required: 'Informe a Descrição',
        minlength: 'Mínimo de 2 caracteres',
        maxlength: 'Máximo de 1000 caracteres'
      },
      imagem: {
        required: 'Informe a Imagem'
      },
      valor: {
        required: 'Informe o Valor'
      }
    };

    super.configMessagesValidation(this.validationMessages);
  }
  
  ngOnInit(): void {
    this.productService.getSuppliers()
      .subscribe(data => this.suppliers = data);

    this.form = this.fb.group({
      fornecedorId: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      imagem: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      ativo: [true]
    })
  }

  ngAfterViewInit(): void {
    super.configValidation(this.formInputElements);
  }

  addProduct(){
    if (!this.form.invalid) {
      this.spinner.show();
      this.product = Object.assign({}, this.product, this.form.value);

      this.product.imagemUpload = this.croppedImage.split(',')[1];
      this.product.imagem = this.imageName;
      this.product.valor = CurrencyUtils.StringToDecimal(this.product.valor);

      this.productService.addProduct(this.product)
        .subscribe(
          data => {
            this.spinner.hide();
            this.processSuccess(data)
          },
          error => {
            this.spinner.hide();
            this.processFail(error);
          }
        );

      this.changesNotSaves = false;
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imageName = event.currentTarget.files[0].name;
  }

  imageCropped(event: ImageCroppedEvent){
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    this.showCropper = true;
  }

  cropperReady(sourceImageDimensions: Dimensions) {

  }

  loadImageFailed() {
    this.errors.push('O formato do arquivo ' + this.imageName + ' não é aceito');
  }

  processSuccess(response: any): void {
    super.processSuccess({ message: 'Produto cadastrado com sucesso!', title: 'Sucesso!'}, 'product/list-product');
  }

 }
