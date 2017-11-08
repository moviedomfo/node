import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {AgGridModule} from 'ag-grid-angular/main';
import { AppComponent } from './app.component';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {CommonService, PatientsService, PersonsService, MedicalInsuranceService} from './service/index';
import { rutesModule } from './app.routing';
import {AuthGuard} from './commonComponents/routingGuard/AuthGuard';
import { PersonsComponent } from './persons/persons.component' ;
import { PatientComponent } from './patient/patient.component';
import { PatientMangerComponent } from './patient/patient-manger/patient-manger.component';
import { PatientBE } from './model/patients.model';
import {IContextInformation, ContextInformation, IRequest, Request, IResponse, Result, ServiceError } from './model/common.model';

import { PatientGridComponent } from './patient/patient-grid/patient-grid.component';

// commonComponents rich grid and rich grid declarative
import {DateComponent} from './commonComponents/ag-grid/date.component';
import {HeaderComponent} from './commonComponents/ag-grid/header.component';
import {HeaderGroupComponent} from './commonComponents/ag-grid/header-group.component';
// commonComponents
import { PageNotFoundComponent } from './commonComponents/page-not-found/page-not-found.component';
import { ModalDialogComponent } from './commonComponents/modal-dialog/modal-dialog.component';
import { FontAgComponent } from './commonComponents/font-ag/font-ag.component';

import { PersonCardComponent } from './persons/person-card/person-card.component';
import { LoginComponent } from './commonComponents/login/login.component';




import { AgmCoreModule } from '@agm/core';
import { GooglePlaceComponent } from './commonComponents/google-place/google-place.component';

import { MedicalInsuranceGridComponent } from './medicalInsurance/medical-insurance-grid/medical-insurance-grid.component';
import { PatienMedicalInsuranceGridComponent } from './patient/patien-medical-insurance-grid/patien-medical-insurance-grid.component';
import { ErrorBoxContainerComponent } from './commonComponents/error-box-container/error-box-container.component';
// import { AlertBlockComponent } from './commonComponents/alert-block/alert-block.component';
import {TestModule} from './prueba/test/test.module';

// import { TestObservablesComponent } from './prueba/test-observables/test-observables.component';
// import { TestObservablesChildComponent } from './prueba/test-observables/test-observables-child/test-observables-child.component';
//import { TestGridParentComponent } from './prueba/test-grid-parent/test-grid-parent.component';

import { AlertBlockComponent } from './commonComponents/alert-block/alert-block.component';
import { TestAlertBlocksComponent } from './prueba/test-alert-blocks/test-alert-blocks.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    FontAgComponent,
    ModalDialogComponent, DateComponent, HeaderComponent, HeaderGroupComponent,PageNotFoundComponent,
    PersonsComponent,
    PatientGridComponent,
    PersonCardComponent,
    LoginComponent,
    PatientMangerComponent,
    GooglePlaceComponent,
    MedicalInsuranceGridComponent,
    PatienMedicalInsuranceGridComponent,
    ErrorBoxContainerComponent,

    AlertBlockComponent,TestAlertBlocksComponent
    
    
    // TestObservablesComponent,
    // TestObservablesChildComponent
    
    
  

  ],
  imports: [AgmCoreModule.forRoot({
    apiKey: 'AIzaSyCOJEnZGUizUc5fQ5BzRDPifKxJuYPRgJA',
    libraries: ['places']
  }),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    BrowserModule,
    AgGridModule.withComponents([
                  DateComponent,
                  HeaderComponent,
                  HeaderGroupComponent,
                  PatientGridComponent,
    ]),
    BootstrapModalModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    rutesModule,
    TestModule
  ],entryComponents: [
    ModalDialogComponent
  ],
  providers: [PersonsService,PatientsService,CommonService,MedicalInsuranceService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
