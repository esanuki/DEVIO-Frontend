import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgBrazilValidators } from 'ng-brazil';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SuccessMessages } from 'src/app/shared/models/success-messages';
import { StringUtils } from 'src/app/shared/utils/string-utils';
import { Address, CepSearch } from '../models/address';
import { Supplier } from '../models/supplier';
import { SupplierService } from '../services/supplier.service';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css']
})
export class EditSupplierComponent extends BaseComponent implements OnInit, AfterViewInit {

  enderecoForm: FormGroup;
  @ViewChildren(FormControlName, {read: ElementRef }) formInputElements: ElementRef[];

  supplier: Supplier = new Supplier();
  address: Address = new Address();

  errorsAddress: any[] = [];
  textDocument: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private ngbService: NgbModal,
    private supplierService: SupplierService,
    router: Router,
    toastr: ToastrService
  ) {

    super(toastr, router);

    this.setValidationMessages();

    super.configMessagesValidation(this.validationMessages);

    this.supplier = this.route.snapshot.data['supplier'];

   }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      id: '',
      nome: ['', [Validators.required]],
      documento: '',
      ativo: ['', [Validators.required]],
      tipoFornecedor: ['',[Validators.required]]
    });

    this.enderecoForm = this.fb.group({
      id: '',
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      cep: ['', [Validators.required, NgBrazilValidators.cep]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      fornecedorId: ''
    });

    this.fillForm();
  }

  ngAfterViewInit(): void {
    this.typeForm().valueChanges.subscribe(() => {
      this.changeDocumentValidation();
      super.configValidation(this.formInputElements);
      super.validarForm();
    })
  }

  changeDocumentValidation() {
    if (this.typeForm().value === '1') {
      this.document().clearValidators();
      this.document().setValidators([Validators.required, NgBrazilValidators.cpf]);
      this.textDocument = 'CPF (requerido)';
    } else {
      this.document().clearValidators();
      this.document().setValidators([Validators.required, NgBrazilValidators.cnpj]);
      this.textDocument = 'CNPJ (requerido)';
    }
  }

  setValidationMessages() {
    
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
    };
  }

  fillForm() {
    this.form.patchValue({
      id: this.supplier.id,
      nome: this.supplier.nome,
      ativo: this.supplier.ativo,
      tipoFornecedor: this.supplier.tipoFornecedor.toString(),
      documento: this.supplier.documento
    });

    this.setMaskDocument();

    this.enderecoForm.patchValue({
      id: this.supplier.endereco.id,
      logradouro: this.supplier.endereco.logradouro,
      numero: this.supplier.endereco.numero,
      complemento: this.supplier.endereco.complemento,
      bairro: this.supplier.endereco.bairro,
      cep: this.supplier.endereco.cep,
      cidade: this.supplier.endereco.cidade,
      estado: this.supplier.endereco.estado
    });
  }

  typeForm() {
    return this.form.get('tipoFornecedor');
  }

  document() {
    return this.form.get('documento');
  }

  setMaskDocument() {
    if (this.typeForm().value === '1')
      this.document().setValidators([Validators.required, NgBrazilValidators.cpf]);
    else
      this.document().setValidators([Validators.required, NgBrazilValidators.cnpj]);
  }

  searchCep(cep: string) {
    cep = StringUtils.onlyNumbers(cep);
    if (cep.length < 8) return;
    this.supplierService.searchCep(cep)
      .subscribe(
        result => this.populateAddress(result),
        error => this.errors.push(error)
      )
  }

  populateAddress(cepSearch: CepSearch){
    this.enderecoForm.patchValue({
      logradouro: cepSearch.logradouro,
        bairro: cepSearch.bairro,
        cep: cepSearch.cep,
        cidade: cepSearch.localidade,
        estado: cepSearch.uf
    });
  }

  update() {
    if ((this.form.dirty || this.enderecoForm.dirty) && this.form.valid){
      this.supplier = Object.assign({}, this.supplier, this.form.value);

      this.supplier.documento = StringUtils.onlyNumbers(this.supplier.documento);
      if (this.supplier.endereco)
        this.supplier.endereco.cep = StringUtils.onlyNumbers(this.supplier.endereco.cep);

      this.supplierService.updateSupplier(this.supplier)
        .subscribe(
          success => { this.processSuccess(success) },
          error => { this.processFail(error) }
        )
    }
  }

  updateAddress(){
    this.supplier.endereco.logradouro = this.enderecoForm.get('logradouro').value;
    this.supplier.endereco.cep = this.enderecoForm.get('cep').value;
    this.supplier.endereco.bairro = this.enderecoForm.get('bairro').value;
    this.supplier.endereco.complemento = this.enderecoForm.get('complemento').value;
    this.supplier.endereco.numero = this.enderecoForm.get('numero').value;
    this.supplier.endereco.cidade = this.enderecoForm.get('cidade').value;
    this.supplier.endereco.estado = this.enderecoForm.get('estado').value;

    this.ngbService.dismissAll();
  }

  processSuccess(response: any): void {
    super.processSuccess({message: 'Fornecedor atualizado com sucesso!', title: 'Sucesso!'}, '/supplier/list-supplier');
  }

  openModal(content) {
    this.ngbService.open(content);
  }

}
