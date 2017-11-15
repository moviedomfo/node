import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModule } from './base.module';

//Bussines components
import { PersonsComponent } from './persons/persons.component' ;
import { PatientComponent } from './patient/patient.component';
import { PatientMangerComponent } from './patient/patient-manger/patient-manger.component';
import { PatientCreateComponent } from './patient/patient-create/patient-create.component';
import { PersonCardComponent } from './persons/person-card/person-card.component';
import { LoginComponent } from './commonComponents/login/login.component';
import { MedicalInsuranceGridComponent } from './medicalInsurance/medical-insurance-grid/medical-insurance-grid.component';
import { PatienMedicalInsuranceGridComponent } from './patient/patien-medical-insurance-grid/patien-medical-insurance-grid.component';
import { PatientBE } from './model/patients.model';
import {IContextInformation, ContextInformation, IRequest, Request, IResponse, Result, ServiceError } from './model/common.model';
import { PatientGridComponent } from './patient/patient-grid/patient-grid.component';
import {CommonService, PatientsService, PersonsService, MedicalInsuranceService} from './service/index';
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
  ],
  providers: [PersonsService,PatientsService,CommonService,MedicalInsuranceService],
})
export class HealthModule { }
