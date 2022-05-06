import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AccountRoutingModule } from './account-routing.module';
import { AccountService } from './services/account.service';
import { LoginComponent } from './login/login.component';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    AccountComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,

    AccountRoutingModule
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule { }
