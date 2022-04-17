import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Supplier } from "../models/supplier";
import { SupplierService } from "./supplier.service";

@Injectable()
export class SupplierResolve implements Resolve<Supplier>{
    
    constructor(private supplierService: SupplierService) {}
    
    resolve(route: ActivatedRouteSnapshot) {
        return this.supplierService.getById(route.params['id']);
    } 

}