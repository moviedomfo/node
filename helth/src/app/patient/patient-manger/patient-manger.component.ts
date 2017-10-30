
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
  isEdit :boolean;
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
 private updatePatient()
 {
  var res$ = this.patientService.updatePatientsService$(this.currentPatient,this.mutualPorPacienteList,null);
  res$.subscribe(res=>{
      alert('Actualizado con exito');
  })
 }
 
  private  preInitializePatient()
  {      this.currentPatient = new PatientBE();
    this.currentPatient.Persona = new PersonBE();
    var id:any;
    
     this.route.params.subscribe( params  => {
        id= params  
        if(id.id!=null)
          this.isEdit=true;
      }
    );
    if(this.isEdit)
    {
      this.currentPatient$= this.patientService.getPatientById(id.id);

      this.currentPatient$.subscribe(res=>{
        this.currentPatient= res;
        //alert(JSON.stringify(res));

      })
    }
    if(this.isEdit==false)
    {
      this.currentPatient = new PatientBE();
      this.currentPatient.Persona = new PersonBE();
     //this.currentPerson.TipoDocumento=613;
      this.currentPatient.FechaAlta= new Date();
      this.mutualPorPacienteList= [];
    }
     //this.patientService.RetriveAllObraSocial()
     
  }

  initView(){
    
  }
  //viene de la lista de todas las mutuales
  onMedicalInsuranceChanged($event)
  {
    this.currentMutual_toAdd = $event;
  }
}
