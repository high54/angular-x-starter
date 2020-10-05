import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Containers
import * as fromContainers from './containers';

const routes: Routes = [
    {
        path: 'sign_up',
        component: fromContainers.AuthSignUpComponent
    },
    {
        path: 'sign_in',
        component: fromContainers.AuthSignInComponent
    },
    {
        path: 'new_password',
        component: fromContainers.AuthPasswordComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
