import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

// Angular Material Module
import { AuthMaterialModule } from './auth-material.module';
// Routes
import { AuthRoutingModule } from './auth-routing.module';
// Containers
import * as fromContainers from './containers';
// Interceptors
import * as fromInterceptors from './interceptors';
import { fakeBackendProvider } from './interceptors/fakeBackend.interceptor';
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthMaterialModule,
        AuthRoutingModule
    ],
    declarations: [
        ...fromContainers.containers
    ],
    providers: [
        environment.production ? fromInterceptors.HttpTokenInterceptor : fakeBackendProvider
    ]
})
export class AuthModule { }
