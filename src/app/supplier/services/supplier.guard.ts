import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router } from "@angular/router";
import { BaseGuard } from "src/app/shared/services/base.guard";
import { NewSupplierComponent } from "../new-supplier/new-supplier.component";

@Injectable()
export class SupplierGuard extends BaseGuard implements CanActivate, CanDeactivate<NewSupplierComponent> {

    constructor(protected router: Router) {
        super(router);
    }

    canDeactivate(component: NewSupplierComponent) {
        if (component.changesNotSaves) {
            return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulário?');
        }

        return true;
    }

    canActivate(activeRoute: ActivatedRouteSnapshot) {
        return super.validateClaims(activeRoute);
    }
}