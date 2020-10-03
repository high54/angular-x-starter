import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular Material Module
import { AuthenticationMaterialModule } from './authentication-material.module';
// Routes
import { AuthenticationRoutingModule } from './authentication-routing.module';
// Containers
import * as fromContainers from './containers';
@NgModule({
    imports: [
        CommonModule,
        AuthenticationMaterialModule,
        AuthenticationRoutingModule
    ],
    declarations: [
        ...fromContainers.containers
    ],
    providers: []
})
export class AuthenticationModule { }
