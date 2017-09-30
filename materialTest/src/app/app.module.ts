
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DatepickerModule} from 'ngx-date-picker';

import {A2Edatetimepicker} from 'ng2-eonasdan-datetimepicker';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    DatepickerModule,A2Edatetimepicker
    
    
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
