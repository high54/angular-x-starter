import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Containers
import * as fromContainers from './containers';

const routes: Routes = [
    {
        path: 'privacy',
        component: fromContainers.PoliciesPrivacyComponent,
        data: {
            breadcrumb: {
                label: 'Privacy',
                url: 'policies/privacy'
            }
        }
    },
    {
        path: 'terms',
        component: fromContainers.PoliciesTermsComponent,
        data: {
            breadcrumb: {
                label: 'Terms',
                url: 'policies/terms'
            }
        }
    }
];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PoliciesRoutingModule { }
