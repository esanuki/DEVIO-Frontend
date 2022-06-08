import { ProductGuard } from './services/product.guard';
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
                component: NewProductComponent,
                canDeactivate: [ProductGuard],
                canActivate: [ProductGuard],
                data: [{ claim: {nome: 'Produto', valor: 'Adicionar'}}]

            },
            {
                path: 'edit-product/:id',
                component: EditProductComponent,
                canActivate: [ProductGuard],
                data: [{claim: {nome: 'Produto', valor: 'Atualizar'}}],
                resolve: {
                    produto: ProductResolver
                }
            },
            {
                path: 'remove-product/:id',
                component: RemoveProductComponent,
                canActivate: [ProductGuard],
                data: [{claim: {nome: 'Produto', valor: 'Excluir'}}],
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
                component: ListProductComponent,
                canActivate: [ProductGuard],
                data: [{claim: {nome: 'Produto', valor: 'Visualizar'}}]
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(productRoutes)],
    exports: [RouterModule]
})
export class ProductRoutingModule {}
