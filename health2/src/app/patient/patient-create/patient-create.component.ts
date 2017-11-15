import { Component, OnInit, ViewEncapsulation,Input } from '@angular/core';


import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { PatientsService, CommonService, MedicalInsuranceService } from '../../service/index';
import { PatientBE, PersonBE, MutualPorPacienteBE, MutualPlanGridView, IContextInformation, IParam, Param, CommonValuesEnum, TipoParametroEnum, CommonParams, HealtConstants } from '../../model/index';
import { FormGroup } from '@angular/forms';
import { ViewChild, ElementRef, Renderer2, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ServiceError } from '../../model/common.model';

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
  constructor() { }

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
