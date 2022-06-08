import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { LocalStorageUtil } from "../utils/local-storage-util";

export abstract class BaseGuard {
    
    private localStorageUtils = new LocalStorageUtil();

    constructor(protected router: Router) {}

    protected validateClaims(activeRoute: ActivatedRouteSnapshot): boolean {

        if (!this.localStorageUtils.getTokenUser()) {
            this.router.navigate(['/account/login'], { queryParams: {returnUrl: this.router.url}});
            return false;
        }
        
        let user = this.localStorageUtils.getUser()

        let claim: any = activeRoute.data[0];
        if (claim !== undefined) {
            let claim = activeRoute.data[0]['claim'];

            if (claim) {
                if (!user.claims) 
                    this.forbidden();

                let userClaims = user.claims.find(x => x.type == claim.nome);

                if (!userClaims)
                    this.forbidden();

                let claimsValue = userClaims.value as string;

                if (!claimsValue.includes(claim.valor))
                    this.forbidden();
            }

            return true;
        }
    }

    private forbidden() {
        this.router.navigate(['/forbidden']);
    }
}