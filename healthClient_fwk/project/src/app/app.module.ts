import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AgmCoreModule} from '@agm/core';
import { PatientGridComponent } from './componets/patient-grid/patient-grid.component';
import { ErrorBoxContainerComponent } from './componets/error-box-container/error-box-container.component';
import { CommonService } from './service/common.service';
import { PatientsService } from './service/patients.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './material-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
    PatientGridComponent,
    
    
    
    ErrorBoxContainerComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    DemoMaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCOJEnZGUizUc5fQ5BzRDPifKxJuYPRgJA',
      libraries: ['places']
    })

  ],
  providers: [PatientsService,CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
