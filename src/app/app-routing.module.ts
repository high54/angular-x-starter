import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'docs/presentation'
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
const routerOptions: ExtraOptions = { scrollPositionRestoration: 'top', initialNavigation: 'enabled', relativeLinkResolution: 'legacy' };
@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
