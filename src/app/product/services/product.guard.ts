import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { BaseGuard } from "src/app/shared/services/base.guard";
import { NewProductComponent } from "../new-product/new-product.component";

@Injectable()
export class ProductGuard extends BaseGuard implements CanActivate, CanDeactivate<NewProductComponent> {

    constructor(protected router: Router) {
        super(router)
    }

    canDeactivate(component: NewProductComponent) {
        if (component.changesNotSaves)
            return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulário?');

        return true;
    }

    canActivate(activatedRoute: ActivatedRouteSnapshot) {
        return super.validateClaims(activatedRoute);
    }
}
