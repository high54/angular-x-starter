import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
// Routes
import { AppRoutingModule } from './app-routing.module';
// Angular Material Module
import { AppMaterialModule } from './app-material.module';
// Authentication Module
import { AuthModule } from './core/auth/auth.module';
// Database Module
import { DatabaseModule } from './core/database/database.module';
// Components
import { AppComponent } from './app.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    AuthModule,
    DatabaseModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
