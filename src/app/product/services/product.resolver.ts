import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Product } from "../models/product";
import { ProductService } from "./product.service";

@Injectable()
export class ProductResolver implements Resolve<Product> {
    
    constructor(private productService: ProductService) {
        
    }
    
    resolve(route: ActivatedRouteSnapshot) {
        return this.productService.getbyId(route.params['id']);
    }
}