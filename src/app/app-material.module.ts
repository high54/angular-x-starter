import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatToolbarModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatToolbarModule
    ]
})
export class AppMaterialModule { }
