import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountComponent } from "./account.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

export const accountRoutes: Routes = [
    {
        path: '',
        component: AccountComponent,
        children: [
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(accountRoutes)],
    exports: [RouterModule]
})
export class AccountRoutingModule {

}