import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutorizationRoutingModule } from './autorization-routing.module';
import { LoginComponent } from './login/login.component';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AutorizationRoutingModule,
    ReactiveFormsModule
  ]
})
export class AutorizationModule { }
