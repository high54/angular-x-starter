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
    },
    {
        path: 'i18n',
        component: fromContainers.InternationalizationComponent,
        data: {
            breadcrumb: {
                label: 'Internationalization',
                url: 'i18n'
            }
        }
    },
    {
        path: 'a11y',
        component: fromContainers.AccessibilityComponent,
        data: {
            breadcrumb: {
                label: 'Accessibility',
                url: 'a11y'
            }
        }
    },
    {
        path: 'responsive-design',
        component: fromContainers.ResponsiveDesignComponent,
        data: {
            breadcrumb: {
                label: 'Responsive design',
                url: 'responsive-design'
            }
        }
    },
    {
        path: 'dark-mode',
        component: fromContainers.DarkModeComponent,
        data: {
            breadcrumb: {
                label: 'Dark mode',
                url: 'dark-mode'
            }
        }
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocsRoutingModule { }
