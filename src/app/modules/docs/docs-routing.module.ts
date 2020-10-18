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
        component: fromContainers.PresentationComponent,
        data: {
            breadcrumb: {
                label: 'Présentation',
                url: 'presentation'
            }
        }
    },
    {
        path: 'intro',
        component: fromContainers.IntroductionComponent,
        data: {
            breadcrumb: {
                label: 'Introduction',
                url: 'intro'
            }
        }
    },
    {
        path: 'start',
        component: fromContainers.GettingStartedComponent,
        data: {
            breadcrumb: {
                label: 'Getting started',
                url: 'start'
            }
        }
    },
    {
        path: 'pwa',
        component: fromContainers.ProgressiveWebAppComponent,
        data: {
            breadcrumb: {
                label: 'Progressive Web App',
                url: 'pwa'
            }
        }
    },
    {
        path: 'ssr',
        component: fromContainers.ServerSideRenderingComponent,
        data: {
            breadcrumb: {
                label: 'Server side rendering',
                url: 'ssr'
            }
        }
    },
    {
        path: 'seo',
        component: fromContainers.SearchEngineOptimizationComponent,
        data: {
            breadcrumb: {
                label: 'Search Engine Optimization',
                url: 'seo'
            }
        }
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocsRoutingModule { }
