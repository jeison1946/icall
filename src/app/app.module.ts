import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiAuthInterceptorService } from './shared/interceptors/api-auth/api-auth-interceptor.service';

@NgModule({
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    BrowserAnimationsModule, 
    NgbCollapseModule 
  ],
  declarations: [
    AppComponent
  ], 
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiAuthInterceptorService, multi: true }
  ]
})

export class AppModule { }