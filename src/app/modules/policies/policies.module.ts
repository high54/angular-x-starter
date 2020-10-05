import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routes
import { PoliciesRoutingModule } from './policies-routing.module';
// Angular Material Module
import { PoliciesMaterialModule } from './policies-material.module';

@NgModule({
    imports: [
        CommonModule,
        PoliciesRoutingModule,
        PoliciesMaterialModule
    ],
    declarations: [],
    providers: []
})
export class PoliciesModule { }
