import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule, MatCheckboxModule,MatDatepickerModule,MatNativeDateModule,
  MatFormFieldModule,MatFormFieldControl
} from '@angular/material';
import {MatInputModule} from '@angular/material';
@NgModule({
  imports: [
    CommonModule, 
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule, MatCheckboxModule,MatDatepickerModule,MatNativeDateModule,
    MatFormFieldModule,MatInputModule
    
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule, MatCheckboxModule,MatDatepickerModule,MatNativeDateModule,
    MatFormFieldModule,MatInputModule
    ]
  
})
export class MaterialModule { }
