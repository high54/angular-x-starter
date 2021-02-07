import { NgModule } from '@angular/core';
// Angular Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';

const materialModules: any[] = [
    MatButtonModule,
    MatDialogModule,
    MatListModule
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
