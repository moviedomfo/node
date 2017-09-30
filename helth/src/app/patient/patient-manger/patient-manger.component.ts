
import { Component, OnInit ,Input} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { PatientsService, CommonService } from '../../service/index';
import {PatientBE, PersonBE, IContextInformation, IParam, Param, CommonValuesEnum, TipoParametroEnum, CommonParams, HealtConstants } from '../../model/index';
import { FormGroup } from '@angular/forms';
import { ViewChild, ElementRef, Renderer2, AfterContentInit } from '@angular/core';


@Component({
  selector: 'app-patient-manger',
  templateUrl: './patient-manger.component.html',
  styleUrls: ['./patient-manger.component.css']
})
export class PatientMangerComponent implements OnInit {
  currentPatient: PatientBE;
  constructor( private patientService: PatientsService,
    private commonService: CommonService,
    private rd: Renderer2) { }

  ngOnInit() {
    this.preInitializePatient();
  } 


  private  preInitializePatient()
  {
    
     this.currentPatient = new PatientBE();
     //this.currentPerson.TipoDocumento=613;
     this.currentPatient.FechaAlta= new Date();
     
     
     
  }

}
