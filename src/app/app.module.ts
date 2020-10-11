import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// Routes
import { AppRoutingModule } from './app-routing.module';
// Angular Material Module
import { AppMaterialModule } from './app-material.module';
// Authentication Module
import { AuthModule } from './core/auth/auth.module';
// Database Module
import { DatabaseModule } from './core/database/database.module';
// User Interface Module
import { UIModule } from './core/ui/ui.module';
// Components
import { AppComponent } from './app.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppMaterialModule,
    AuthModule,
    DatabaseModule,
    UIModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
