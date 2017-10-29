
import { Component, OnInit ,Input} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { PatientsService, CommonService,MedicalInsuranceService } from '../../service/index';
import {PatientBE, PersonBE,MutualPorPacienteBE,MutualPlanGridView, IContextInformation, IParam, Param, CommonValuesEnum, TipoParametroEnum, CommonParams, HealtConstants } from '../../model/index';
import { FormGroup } from '@angular/forms';
import { ViewChild, ElementRef, Renderer2, AfterContentInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-patient-manger',
  templateUrl: './patient-manger.component.html',
  styleUrls: ['./patient-manger.component.css']
})
export class PatientMangerComponent implements OnInit {
  currentPatient: PatientBE;
  currentPatient$:Observable< PatientBE>;
  currentMutual_toAdd :MutualPlanGridView;
  currentMutual_Patient :MutualPlanGridView;
  mutualPorPacienteList:MutualPorPacienteBE[];

  constructor( private route: ActivatedRoute,
    private patientService: PatientsService,
    private commonService: CommonService,
    private medicalInsuranceService: MedicalInsuranceService,
    private rd: Renderer2) { }

  ngOnInit() {
    this.preInitializePatient();
  } 

 private createPatient()
 {
  this.patientService.createPatientsService$(this.currentPatient,null);

 }
  private  preInitializePatient()
  {
    var id:any;
     this.currentPatient = new PatientBE();
     this.route.params.subscribe( params  => 
        id= params  
    );
    this.currentPatient$= this.patientService.getPatientById(id.id);

    this.currentPatient$.subscribe(res=>{
      this.currentPatient= res;
      alert(JSON.stringify(res));
    })
    //  this.currentPatient.Persona = new PersonBE();
     //this.currentPerson.TipoDocumento=613;
     this.currentPatient.FechaAlta= new Date();
     this.mutualPorPacienteList= [];
     
     //this.patientService.RetriveAllObraSocial()
     
  }

  //viene de la lista de todas las mutuales
  onMedicalInsuranceChanged($event)
  {
    this.currentMutual_toAdd = $event;
  }
}
