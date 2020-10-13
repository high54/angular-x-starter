import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Containers
import * as fromContainers from './containers';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'presentation'
    },
    {
        path: 'presentation',
        component: fromContainers.PresentationComponent
    },
    {
        path: 'intro',
        component: fromContainers.IntroductionComponent
    },
    {
        path: 'start',
        component: fromContainers.GettingStartedComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocsRoutingModule { }
