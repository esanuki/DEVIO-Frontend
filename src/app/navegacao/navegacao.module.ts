import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AcessoNegadoComponent, 
    FooterComponent, 
    MenuComponent, 
    NotFoundComponent, 
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  exports: [
    MenuComponent,
    FooterComponent,
    NotFoundComponent,
    AcessoNegadoComponent,
    HomeComponent
  ]
})
export class NavegacaoModule { }
