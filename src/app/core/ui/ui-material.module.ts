import { NgModule } from '@angular/core';
// Angular Material Components
import { MatButtonModule } from '@angular/material/button';

const materialModules: any[] = [
    MatButtonModule
];
@NgModule({
    imports: [
        ...materialModules
    ],
    exports: [
        ...materialModules
    ]
})
export class UIMaterialModule { }
