import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routes
import { PoliciesRoutingModule } from './policies-routing.module';
// Angular Material Module
import { PoliciesMaterialModule } from './policies-material.module';

// Containers
import * as fromContainers from './containers';
@NgModule({
    imports: [
        CommonModule,
        PoliciesRoutingModule,
        PoliciesMaterialModule
    ],
    declarations: [
        ...fromContainers.containers
    ],
    providers: []
})
export class PoliciesModule { }
