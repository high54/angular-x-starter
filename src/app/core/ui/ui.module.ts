import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import * as fromComponents from './components';
// Angular Material Module
import { UIMaterialModule } from './ui-material.module';

@NgModule({
    imports: [
        CommonModule,
        UIMaterialModule
    ],
    declarations: [
        ...fromComponents.components
    ],
    providers: []
})
export class UIModule { }
