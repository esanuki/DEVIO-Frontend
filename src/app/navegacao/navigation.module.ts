import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuLoginComponent } from './menu-login/menu-login.component';



@NgModule({
  declarations: [
    ForbiddenComponent, 
    FooterComponent, 
    MenuComponent, 
    NotFoundComponent, 
    HomeComponent, MenuLoginComponent
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
    ForbiddenComponent,
    HomeComponent
  ]
})
export class NavigationModule { }
