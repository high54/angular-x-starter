import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Containers
import * as fromContainers from './containers';

const routes: Routes = [
    {
        path: 'privacy',
        component: fromContainers.PoliciesPrivacyComponent
    },
    {
        path: 'terms',
        component: fromContainers.PoliciesTermsComponent
    }
];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PoliciesRoutingModule { }
