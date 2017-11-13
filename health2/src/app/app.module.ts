import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';


import { rutesModule } from './app.routing';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';

// commonComponents rich grid and rich grid declarative
import {AgGridModule} from 'ag-grid-angular/main';
import {DateComponent} from './commonComponents/ag-grid/date.component';
import {HeaderComponent} from './commonComponents/ag-grid/header.component';
import {HeaderGroupComponent} from './commonComponents/ag-grid/header-group.component';
// commonComponents
import { PageNotFoundComponent } from './commonComponents/page-not-found/page-not-found.component';
import { ModalDialogComponent } from './commonComponents/modal-dialog/modal-dialog.component';
import { FontAgComponent } from './commonComponents/font-ag/font-ag.component';
import {AuthGuard} from './commonComponents/routingGuard/AuthGuard';

// google 
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceComponent } from './commonComponents/google-place/google-place.component';

//Bussines components
import { PersonsComponent } from './persons/persons.component' ;
import { PatientComponent } from './patient/patient.component';
import { PatientMangerComponent } from './patient/patient-manger/patient-manger.component';
import { PersonCardComponent } from './persons/person-card/person-card.component';
import { LoginComponent } from './commonComponents/login/login.component';
import { MedicalInsuranceGridComponent } from './medicalInsurance/medical-insurance-grid/medical-insurance-grid.component';
import { PatienMedicalInsuranceGridComponent } from './patient/patien-medical-insurance-grid/patien-medical-insurance-grid.component';
import { PatientBE } from './model/patients.model';
import {IContextInformation, ContextInformation, IRequest, Request, IResponse, Result, ServiceError } from './model/common.model';
import { PatientGridComponent } from './patient/patient-grid/patient-grid.component';
import {CommonService, PatientsService, PersonsService, MedicalInsuranceService} from './service/index';
import { AlertBlockComponent } from './commonComponents/alert-block/alert-block.component';
import {ErrorBoxContainerComponent } from './commonComponents/error-box-container/error-box-container.component';
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
    AlertBlockComponent
  ],
  imports: [AgmCoreModule.forRoot({
    apiKey: 'AIzaSyCOJEnZGUizUc5fQ5BzRDPifKxJuYPRgJA',
    libraries: ['places']
  }),
    BrowserModule,
    AgGridModule.withComponents([
      DateComponent,
      HeaderComponent,
      HeaderGroupComponent,
      //PatientGridComponent,
  ]),
  BootstrapModalModule,
  FormsModule,
  ReactiveFormsModule,
  HttpModule,
  rutesModule,
  //TestModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }