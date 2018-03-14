import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

 
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TestModule } from './test.module';

import { AppComponent } from './app.component';


import { rutesModule } from './app.routing';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';

// common-components rich grid and rich grid declarative
import {AgGridModule} from 'ag-grid-angular/main';
import {DateComponent} from './common-components/ag-grid/date.component';
import {HeaderComponent} from './common-components/ag-grid/header.component';
import {HeaderGroupComponent} from './common-components/ag-grid/header-group.component';
// common-components
import { PageNotFoundComponent } from './common-components/page-not-found/page-not-found.component';
import { ModalDialogComponent } from './common-components/modal-dialog/modal-dialog.component';
import { FontAgComponent } from './common-components/font-ag/font-ag.component';
import {AuthGuard} from './common-components/routingGuard/AuthGuard';

// // google 
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceComponent } from './common-components/google-place/google-place.component';
import {HealthModule } from './health.module';
// //Bussines components
import { PersonsComponent } from './functionalComponents/persons/persons.component' ;
import { PatientComponent } from './functionalComponents/patient/patient.component';
import { PatientMangerComponent } from './functionalComponents/patient/patient-manger/patient-manger.component';
import { PatientCreateComponent } from './functionalComponents/patient/patient-create/patient-create.component';
import { PersonCardComponent } from './functionalComponents/persons/person-card/person-card.component';
import { LoginComponent } from './common-components/login/login.component';
import { MedicalInsuranceGridComponent } from './functionalComponents/medicalInsurance/medical-insurance-grid/medical-insurance-grid.component';
import { PatienMedicalInsuranceGridComponent } from './functionalComponents/patient/patien-medical-insurance-grid/patien-medical-insurance-grid.component';

import {IContextInformation, ContextInformation, IRequest, Request, IResponse, Result, ServiceError } from './model/common.model';
import { PatientGridComponent } from './functionalComponents/patient/patient-grid/patient-grid.component';
import {CommonService, PatientsService, PersonsService, MedicalInsuranceService,ProfesionalService} from './service/index';
import { AlertBlockComponent } from './common-components/alert-block/alert-block.component';
import {ErrorBoxContainerComponent } from './common-components/error-box-container/error-box-container.component';
import { ProfesionalManageComponent } from './functionalComponents/profesional/profesional-manage/profesional-manage.component';
import { ProfesionalCardComponent } from './functionalComponents/profesional/profesional-card/profesional-card.component';
import { ProfesionalGridComponent } from './functionalComponents/profesional/profesionalGrid/profesionalGrid.component';
import { ResourceSchedulingGridComponent } from './functionalComponents/profesional/resource-scheduling-grid/resource-scheduling-grid.component';
import { ResourceSchedulingManageComponent } from './functionalComponents/profesional/resource-scheduling-manage/resource-scheduling-manage.component';
import { WeekDaysCheckEditComponent } from './common-components/week-days-check-edit/week-days-check-edit.component';
import { FormsComponent } from './prueba/forms/forms.component';
import { ChildComponent } from './prueba/forms/child/child.component';
 import { EmailValidator } from './common-components/validate-email.directive';

import { IntersectionsComponent } from './prueba/test-times/intersections/intersections.component';
import { SessionSettingComponent } from './functionalComponents/security/sessionSetting.component';
import { ValidateEqualDirective } from './common-components/validate-equal.directive';
import { CheckBoxListComponent } from './prueba/check-box-list/check-box-list.component';
import { ContactComponent } from './functionalComponents/persons/contact/contact.component';
import { AppsettingComponent } from './common-components/layout/appsetting/appsetting.component';
import { AppmenuComponent } from './common-components/layout/appmenu/appmenu.component';
import { AppfooterComponent } from './common-components/layout/appfooter/appfooter.component';
import { AppheaderComponent } from './common-components/layout/appheader/appheader.component';
import { PersonGridComponent } from "./functionalComponents/persons/person-grid/person-grid.component";
import { FormControlsComponent } from './prueba/forms/form-controls/form-controls.component';
import { FormControlsAdminLteComponent } from './prueba/forms/form-controls-admin-lte/form-controls-admin-lte.component';
@NgModule({
  declarations: [
    AppComponent,
    FontAgComponent,
    ModalDialogComponent, DateComponent, HeaderComponent, HeaderGroupComponent,PageNotFoundComponent,
    PatientComponent,
    PersonsComponent,
    PersonGridComponent,
    PatientGridComponent,
    PersonCardComponent,
    LoginComponent,
    PatientMangerComponent,
    PatientCreateComponent,
    MedicalInsuranceGridComponent,
    PatienMedicalInsuranceGridComponent,
    GooglePlaceComponent,
    ErrorBoxContainerComponent,
    AlertBlockComponent,
    ProfesionalManageComponent,
    ProfesionalGridComponent,
    ProfesionalCardComponent,ResourceSchedulingGridComponent, ResourceSchedulingManageComponent, WeekDaysCheckEditComponent, FormsComponent, ChildComponent
    , EmailValidator, IntersectionsComponent, SessionSettingComponent, ValidateEqualDirective, CheckBoxListComponent, ContactComponent,
    AppsettingComponent, AppmenuComponent, AppfooterComponent, AppheaderComponent, FormControlsComponent, FormControlsAdminLteComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCOJEnZGUizUc5fQ5BzRDPifKxJuYPRgJA',
      libraries: ['places']  })
    ,
    BrowserModule,
    ReactiveFormsModule ,
    AgGridModule.withComponents([
      DateComponent,
      HeaderComponent,
      HeaderGroupComponent
      
  ]),
  //HealthModule,
  BootstrapModalModule,
  FormsModule,
  
  HttpModule,
  rutesModule,
  TestModule
  
  ],
   providers: [PersonsService,PatientsService,CommonService,MedicalInsuranceService,ProfesionalService,AuthGuard],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
