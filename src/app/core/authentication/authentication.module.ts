import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular Material Module
import { AuthenticationMaterialModule } from './authentication-material.module';
// Routes
import { AuthenticationRoutingModule } from './authentication-routing.module';
@NgModule({
    imports: [
        CommonModule,
        AuthenticationMaterialModule,
        AuthenticationRoutingModule
    ],
    declarations: [],
    providers: []
})
export class AuthenticationModule { }
