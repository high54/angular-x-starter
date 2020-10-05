import { NgModule } from '@angular/core';
// Angular Material Modules
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
    imports: [
        MatSnackBarModule
    ],
    exports: [
        MatSnackBarModule
    ]
})
export class DatabaseMaterialModule { }
