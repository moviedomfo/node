import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PruebaComponent } from '../prueba.component';
import { TestControlesComponent } from '../testcontroles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule, FormsModule     
  ],
  declarations: [PruebaComponent,
    TestControlesComponent]
})
export class TestModule { }
