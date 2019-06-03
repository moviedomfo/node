import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AlertBlockComponent } from './commonComponets/alert-block/alert-block.component';
import { ErrorBoxContainerComponent } from './commonComponets/error-box-container/error-box-container.component';
import { Page404NotFoundComponent } from './commonComponets/page404-not-found/page404-not-found.component';

import { CommonService } from './service/common.service';

import { PatientsService } from './service/patients.service';
import { FwkDocumentService } from './service/fwkSvcAlerts.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NgxSpinnerModule } from 'ngx-spinner';
import {NgxPaginationModule} from 'ngx-pagination';
import { AlertModule } from "ngx-bootstrap";
import { JwtModule } from '@auth0/angular-jwt';
import { JwtAuthInterceptor } from './service/jwtIntersept';
import { LogingComponent } from './components/loging/loging.component';
import { PatientGridComponent } from './components/patient-grid/patient-grid.component';
 import { PatientAlertsComponent } from './components/patient-alerts/patient-alerts.component';
 import { PatientInfoComponent } from './components/patient-info/patient-info.component';
 import { PatientGridTableComponent } from './components/patient-grid-table/patient-grid-table.component';
 import { PatientGridTableModalComponent } from './components/patient-grid-table-modal/patient-grid-table-modal.component';
import { PatientGridFilterPAginationonServerSideComponent } from './components/patient-grid-filter-paginationon-server-side/patient-grid-filter-paginationon-server-side.component';
import { PatientCardListComponent } from './components/patient-card-list/patient-card-list.component';
import { TestObservablesComponent } from './samples/test-observables/test-observables.component';
import { SampleIndexComponent } from './samples/index/index.component';

const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ErrorBoxContainerComponent,
    LogingComponent,
    Page404NotFoundComponent,
    MainNavComponent, 
    AlertBlockComponent, 
    PatientGridComponent,
    PatientAlertsComponent,
    PatientInfoComponent,
     PatientGridTableComponent, 
     PatientGridTableModalComponent, PatientGridFilterPAginationonServerSideComponent, PatientCardListComponent, 
     TestObservablesComponent, SampleIndexComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCOJEnZGUizUc5fQ5BzRDPifKxJuYPRgJA',
      libraries: ['places']
    }),
    LayoutModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    AlertModule


  ],
  providers: [
    PatientsService,
    CommonService,
    FwkDocumentService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtAuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
