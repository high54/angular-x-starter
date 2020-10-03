import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular Material Module
import { UsersMaterialModule } from './users-material.module';
// Routes
import { UsersRoutingModule } from './users-routing.module';
// Containers
import * as fromContainers from './containers';
@NgModule({
    imports: [
        CommonModule,
        UsersMaterialModule,
        UsersRoutingModule
    ],
    declarations: [
        ...fromContainers.containers
    ],
    providers: []
})
export class UsersModule { }
