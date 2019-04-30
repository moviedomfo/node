import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AgmCoreModule} from '@agm/core';
import {PatientGridComponent } from './components/patient-grid/patient-grid.component';
import {ErrorBoxContainerComponent } from './components/error-box-container/error-box-container.component';
import {CommonService } from './service/common.service';
import {PatientsService } from './service/patients.service';
import {FwkDocumentService} from './service/fwkSvcAlerts.service'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material';
import { PatientAlertsComponent } from './components/patient-alerts/patient-alerts.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    PatientGridComponent,
    ErrorBoxContainerComponent,
    PatientAlertsComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    SocketIoModule.forRoot(config),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCOJEnZGUizUc5fQ5BzRDPifKxJuYPRgJA',
      libraries: ['places']
    })

  ],
  providers: [PatientsService,CommonService,FwkDocumentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
