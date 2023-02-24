import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Routing
import { RouterModuleForChild } from './routing-local-entry.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModuleForChild,
    HttpClientModule
  ]
})
export class LocalEntryModule { }
