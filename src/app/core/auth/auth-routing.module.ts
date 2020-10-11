import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Containers
import * as fromContainers from './containers';

const routes: Routes = [
    {
        path: 'sign_up',
        component: fromContainers.AuthSignUpComponent,
        data: {
            breadcrumb: {
                label: 'Sign up',
                url: 'sign_up'
            }
        }
    },
    {
        path: 'sign_in',
        component: fromContainers.AuthSignInComponent,
        data: {
            breadcrumb: {
                label: 'Sign In',
                url: 'sign_in'
            }
        }
    },
    {
        path: 'new_password',
        component: fromContainers.AuthPasswordComponent,
        data: {
            breadcrumb: {
                label: 'reset Password',
                url: 'new_password'
            }
        }
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
