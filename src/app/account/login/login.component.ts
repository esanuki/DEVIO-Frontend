import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

  user: User;

  constructor(
    router: Router,
    toastr: ToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: AccountService,
    private spinner: NgxSpinnerService
  ) {
    
    super(toastr, router);

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'E-mail inválido'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      }
    };

    super.configMessagesValidation(this.validationMessages);
  }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.rangeLength([6,15])]]
    });
  }

  ngAfterViewInit(): void {
    super.configValidation(this.formInputElements);
  }

  login(){
    if (this.form.dirty && this.form.valid) {
      this.user = Object.assign({}, this.user, this.form.value);
      this.spinner.show();

      this.service.login(this.user)
        .subscribe(
        success => {
          this.spinner.hide();
          this.processSuccess(success)
        },
        error => {
          this.spinner.hide();
          this.processFail(error)
        
        })
    }
  }

  processSuccess(response: any){
    this.service.LocalStorage.saveDateLocalUser(response);

    let toastr = this.toastr.success('Registro efetuado com sucess!');
    this.router.navigate(['/home']);
    // if (toastr) {
    //   toastr.onHidden.subscribe(() => {

    //   })
    // }
  }

}
