import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

  user: User;

  constructor(
    router: Router,
    toastr: ToastrService,
    private fb: FormBuilder,
    private service: AccountService
  ) {
    super(toastr, router);

    this.validationMessages = {
      email: {
        required: 'Informe a senha',
        email: 'E-mail inválido'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      },
      confirmPassword: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    }

    super.configMessagesValidation(this.validationMessages);
  }

  ngOnInit(): void {
    
    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15])]);
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15]), CustomValidators.equalTo(senha)]);
    
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: senha,
      confirmPassword: senhaConfirm
    })
  }

  ngAfterViewInit(): void {
    super.configValidation(this.formInputElements);
  }

  registrar() {
    if (this.form.dirty && this.form.valid) {
      this.user = Object.assign({}, this.user, this.form.value)

      this.service.register(this.user)
        .subscribe(
          success => this.processSuccess(success),
          fail => this.processFail(fail)
        )
    }
  }

  processSuccess(response: any): void {
    this.service.LocalStorage.saveDateLocalUser(response);

    super.processSuccess({message: 'Registro realizado com sucesso!', title: 'Bem Vindo'}, '/home');
  }

}
