import { NgModule } from '@angular/core';
// Angular Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

const materialModules: any[] = [
    MatButtonModule,
    MatDialogModule
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
