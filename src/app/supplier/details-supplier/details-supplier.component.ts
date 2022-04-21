import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { utilsBr } from 'js-brasil';
import { NgBrazilValidators } from 'ng-brazil';
import { Supplier } from '../models/supplier';


@Component({
  selector: 'app-details-supplier',
  templateUrl: './details-supplier.component.html',
  styleUrls: ['./details-supplier.component.css']
})
export class DetailsSupplierComponent implements OnInit {

  form: FormGroup;
  MASKS = utilsBr.MASKS;

  supplier: Supplier;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.gerarForm();
    
    this.supplier = this.route.snapshot.data['supplier'];

    this.fillForm();
  }

  gerarForm(){
    this.form = this.fb.group({
      id: '',
      nome: [''],
      documento: '',
      ativo: [{value: '', disabled: true}],
      tipoFornecedor: [{value: '', disabled: true}]
    });
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

  }

  setMaskDocument() {
    if (this.typeForm().value === '1')
      this.document().setValidators([Validators.required, NgBrazilValidators.cpf]);
    else
      this.document().setValidators([Validators.required, NgBrazilValidators.cnpj]);
  }

  document() {
    return this.form.get('documento');
  }

  typeForm() {
    return this.form.get('tipoFornecedor');
  }

}
