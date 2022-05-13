import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailsProductComponent } from "./details-product/details-product.component";
import { EditProductComponent } from "./edit-product/edit-product.component";
import { ListProductComponent } from "./list-product/list-product.component";
import { NewProductComponent } from "./new-product/new-product.component";
import { ProductComponent } from "./product.component";
import { RemoveProductComponent } from "./remove-product/remove-product.component";
import { ProductResolver } from "./services/product.resolver";

export const productRoutes: Routes = [
    {
        path: '',
        component: ProductComponent,
        children: [
            {
                path: 'new-product',
                component: NewProductComponent
            },
            {
                path: 'edit-product/:id',
                component: EditProductComponent,
                resolve: {
                    produto: ProductResolver
                }
            },
            {
                path: 'remove-product/:id',
                component: RemoveProductComponent,
                resolve: {
                    produto: ProductResolver
                }
            },
            {
                path: 'details-product/:id',
                component: DetailsProductComponent,
                resolve: {
                    produto: ProductResolver
                }
            },
            {
                path: 'list-product',
                component: ListProductComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(productRoutes)],
    exports: [RouterModule]
})
export class ProductRoutingModule {}