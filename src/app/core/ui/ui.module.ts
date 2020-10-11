import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Angular Material Module
import { UIMaterialModule } from './ui-material.module';
// Components
import * as fromComponents from './components';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        UIMaterialModule
    ],
    declarations: [
        ...fromComponents.components
    ],
    exports: [
        ...fromComponents.components
    ],
    providers: []
})
export class UIModule { }
