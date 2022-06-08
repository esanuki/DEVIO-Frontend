import { Component, Input } from "@angular/core";
import { Product } from "src/app/product/models/product";
import { environment } from "src/environments/environment";

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent {

    image: string = environment.imagensUrl;

    @Input() products: Product[];
}