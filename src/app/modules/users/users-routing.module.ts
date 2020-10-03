import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Containers
import * as fromContainers from './containers';

const routes: Routes = [
    {
        path: 'sign-up',
        component: fromContainers.UsersSignUpComponent
    },
    {
        path: 'sign-in',
        component: fromContainers.UsersSignInComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
