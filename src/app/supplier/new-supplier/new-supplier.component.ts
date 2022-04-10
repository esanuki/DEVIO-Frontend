import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgBrazil, NgBrazilValidators } from 'ng-brazil';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SuccessMessages } from 'src/app/shared/models/success-messages';
import { StringUtils } from 'src/app/shared/utils/string-utils';
import { convertTypeAcquisitionFromJson } from 'typescript';
import { CepSearch } from '../models/address';
import { Supplier } from '../models/supplier';
import { SupplierService } from '../services/supplier.service';

@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-supplier.component.html',
  styleUrls: ['./new-supplier.component.css']
})
export class NewSupplierComponent extends BaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

  supplier: Supplier = new Supplier();
  textDocumento: string = 'CPF requerido';
  
  constructor(
    router: Router,
    toastr: ToastrService,
    private fb: FormBuilder,
    private supplierService: SupplierService
  ) { 
    super(toastr, router);

    this.validationMessages = {
      nome: {
        required: 'Informe o Nome'
      },
      documento: {
        required: 'Informe o Documento',
        cpf: 'CPF é inválido',
        cnpj: 'CNPJ é inválido'
      },
      logradouro: {
        required: 'Informe o Logradouro'
      },
      numero: {
        required: 'Informe o Número'
      },
      bairro: {
        required: 'Informe o Bairro'
      },
      cep: {
        required: 'Informe o CEP'
      },
      cidade: {
        required: 'Informe a Cidade'
      },
      estado: {
        required: 'Informe o Estado'
      }
    }

    super.configMessagesValidation(this.validationMessages);

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required]],
      documento: ['', [Validators.required, NgBrazilValidators.cpf]],
      ativo: ['', [Validators.required]],
      tipoFornecedor: ['', [Validators.required]],

      endereco: this.fb.group({
        logradouro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        complemento: [''],
        bairro: ['', [Validators.required]],
        cep: ['', [Validators.required]],
        cidade: ['', [Validators.required]],
        estado: ['', [Validators.required]]
      })

    });

    this.form.patchValue({tipoFornecedor: '1', ativo: true});
  }

  ngAfterViewInit(): void {
    this.typeForm().valueChanges
      .subscribe(() => {
        this.changeDocumentValidation();
        super.configValidation(this.formInputElements);
        super.validarForm();
      })
  }

  changeDocumentValidation() {
    if (this.typeForm().value === '1') {
      this.document().clearValidators();
      this.document().setValidators([Validators.required, NgBrazilValidators.cpf]);
      this.textDocumento = 'CPF (requerido)';
    } else {
      this.document().clearValidators();
      this.document().setValidators([Validators.required, NgBrazilValidators.cnpj]);
      this.textDocumento = 'CNPJ (requerido)';
    }
  }

  typeForm(){
    return this.form.get('tipoFornecedor');
  }

  document() {
    return this.form.get('documento');
  }

  buscaCep(cep: string) {
    cep = StringUtils.onlyNumbers(cep);
    if (cep.length < 8) return;
    this.supplierService.searchCep(cep)
      .subscribe(
        result => this.populateAddress(result),
        error => this.errors.push(error)
      )
  }

  populateAddress(cepSearch: CepSearch){
    this.form.patchValue({
      endereco: {
        logradouro: cepSearch.logradouro,
        bairro: cepSearch.bairro,
        cep: cepSearch.cep,
        cidade: cepSearch.localidade,
        estado: cepSearch.uf
      }
    });
  }

  addSupplier() {
    
    if (this.form.dirty && this.form.valid) {
      this.supplier = Object.assign({}, this.supplier, this.form.value);

      this.supplier.endereco.cep = StringUtils.onlyNumbers(this.supplier.endereco.cep);
      this.supplier.documento = StringUtils.onlyNumbers(this.supplier.documento);

      this.supplierService.addSupplier(this.supplier)
        .subscribe(
          success => { this.processSuccess(success) },
          error => { this.processFail(error) }
        );
    }
  }

  processSuccess(response: any): void {
    this.changesNotSaves = false;
    super.processSuccess({ message: 'Fornecedor cadastrado com sucesso!', title: 'Sucesso!'}, 'supplier/list-supplier');
  }
}
