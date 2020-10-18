import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'docs/presentation'
  },
  {
    path: 'policies',
    loadChildren: () => import('./modules/policies/policies.module').then((m) => m.PoliciesModule)
  },
  {
    path: 'docs',
    loadChildren: () => import('./modules/docs/docs.module').then((m) => m.DocsModule),
    data: {
      breadcrumb: {
        label: 'Documentation',
        url: 'docs'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
