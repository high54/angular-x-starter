import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Containers
import * as fromContainers from './containers';

const routes: Routes = [
    {
        path: 'register',
        component: fromContainers.AuthenticationRegisterComponent
    },
    {
        path: 'sign-in',
        component: fromContainers.AuthenticationSignInComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
