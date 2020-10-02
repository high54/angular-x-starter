import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Routes
import { AppRoutingModule } from './app-routing.module';
// Angular Material Module
import { AppMaterialModule } from './app-material.module';
// UI Module
import { UIModule } from './core/ui/ui.module';
// Components
import { AppComponent } from './app.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMaterialModule,
    UIModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
