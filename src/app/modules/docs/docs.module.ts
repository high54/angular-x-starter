import { NgModule } from '@angular/core';
// Routes
import { DocsRoutingModule } from './docs-routing.module';
// Material Module
import { DocsMaterialModule } from './docs-material.module';
// Containers
import * as fromContainers from './containers';
@NgModule({
    imports: [
        DocsRoutingModule,
        DocsMaterialModule
    ],
    declarations: [
        ...fromContainers.containers
    ],
    providers: []
})
export class DocsModule { }
