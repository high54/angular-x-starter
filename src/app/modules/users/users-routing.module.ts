import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Containers
import * as fromContainers from './containers';

const routes: Routes = [
    {
        path: 'sign_up',
        component: fromContainers.UsersSignUpComponent
    },
    {
        path: 'sign_in',
        component: fromContainers.UsersSignInComponent
    },
    {
        path: 'new_password',
        component: fromContainers.UsersPasswordComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
