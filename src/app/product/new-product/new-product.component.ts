import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { Supplier } from 'src/app/supplier/models/supplier';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent extends BaseComponent implements OnInit {

  fornecedores: Supplier[] = [];

  imagemNome: string;
  
  constructor(
    router: Router,
    toastr: ToastrService,
    private fb: FormBuilder
  ) { 
    super(toastr, router);
  }

  ngOnInit(): void {
    let fornec = new Supplier();
    fornec.id = '1';
    fornec.nome = 'Pet Shop Boys';

    this.fornecedores.push(fornec);

    this.form = this.fb.group({
      fornecedorId: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      imagem: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      ativo: [true]
    })
  }

  fileChangeEvent(event: any): void {
    this.imagemNome = event.currentTarget.files[0].name;
  }

}
