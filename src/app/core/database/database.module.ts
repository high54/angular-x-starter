import { NgModule } from '@angular/core';
// Services
import * as fromServices from './services';
// Angular Material Modules
import { DatabaseMaterialModule } from './database-material.module';

@NgModule({
    imports: [
        DatabaseMaterialModule
    ],
    providers: [
        ...fromServices.services
    ]
})
export class DatabaseModule { }
