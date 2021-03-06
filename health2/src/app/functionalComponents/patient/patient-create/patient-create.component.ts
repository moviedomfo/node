import { Component, OnInit, ViewEncapsulation,Input,ViewChild, ElementRef, Renderer2, AfterContentInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PatientsService, CommonService, MedicalInsuranceService, AuthenticationService } from '../../../service/index';
import { PatientBE, PersonBE, MutualPorPacienteBE, MutualPlanGridView,ServiceError, IContextInformation, IParam, Param, 
        CommonValuesEnum, TipoParametroEnum, CommonParams, AppConstants } from '../../../model/index';
        
@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PatientCreateComponent implements OnInit {
  globalError: ServiceError;
  currentPatient: PatientBE;
  isEdit:boolean;
  constructor(private router: Router) { }

  ngOnInit() {
    
    this.preInitializePatient();

  }
  private preInitializePatient() {
    this.currentPatient = new PatientBE();
    this.currentPatient.Persona = new PersonBE();
    this.currentPatient.Mutuales = [];
    
    //if is create 
    if (this.isEdit == false) {

      //this.currentPerson.TipoDocumento=613;
      this.currentPatient.FechaAlta = new Date();
      this.currentPatient.Persona.FechaNacimiento = new Date();
      this.currentPatient.Persona.NroDocumento = "0";
    }
  } 

  OnComponentError_personCard(err: ServiceError) {
 
    this.globalError = err;
  }
  
  onMedicalInsuranceChanged($event) {
    
    
  }
}
