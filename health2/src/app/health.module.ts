import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModule } from './base.module';

//Bussines components
import { PersonsComponent } from './functionalComponents/persons/persons.component' ;
import { PatientComponent } from './functionalComponents/patient/patient.component';
import { PatientMangerComponent } from './functionalComponents/patient/patient-manger/patient-manger.component';
import { PatientCreateComponent } from './functionalComponents/patient/patient-create/patient-create.component';
import { PersonCardComponent } from './functionalComponents/persons/person-card/person-card.component';
import { LoginComponent } from './commonComponents/login/login.component';
import { MedicalInsuranceGridComponent } from './functionalComponents/medicalInsurance/medical-insurance-grid/medical-insurance-grid.component';
import { PatienMedicalInsuranceGridComponent } from './functionalComponents/patient/patien-medical-insurance-grid/patien-medical-insurance-grid.component';
import { PatientGridComponent } from './functionalComponents/patient/patient-grid/patient-grid.component';
import { ProfesionalGridComponent } from './functionalComponents/profesional/profesionalGrid/profesionalGrid.component';


import {IContextInformation, ContextInformation, IRequest, Request, IResponse, Result, ServiceError } from './model/common.model';

import {CommonService, PatientsService, PersonsService, MedicalInsuranceService,AuthenticationService} from './service/index';


@NgModule({
  imports: [
    CommonModule,BaseModule
  ],
  declarations: [
    PatientComponent,
    PersonsComponent,
    PatientGridComponent,
    PersonCardComponent,
    LoginComponent,
    PatientMangerComponent,PatientCreateComponent,
    MedicalInsuranceGridComponent,
    PatienMedicalInsuranceGridComponent,
    ProfesionalGridComponent,
  ],
  providers: [PersonsService,PatientsService,CommonService,MedicalInsuranceService,AuthenticationService],
})
export class HealthModule { }
