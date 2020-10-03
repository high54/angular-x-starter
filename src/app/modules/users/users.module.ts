import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular Material Module
import { UsersMaterialModule } from './users-material.module';
// Routes
import { UsersRoutingModule } from './users-routing.module';
// Containers
import * as fromContainers from './containers';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsersMaterialModule,
        UsersRoutingModule
    ],
    declarations: [
        ...fromContainers.containers
    ],
    providers: []
})
export class UsersModule { }
