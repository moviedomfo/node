import { Component, OnInit, ViewEncapsulation ,ViewChild, ElementRef,  AfterContentInit, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { PatientsService, CommonService, MedicalInsuranceService } from '../../../service/index';
import { PatientBE, PersonBE, MutualPorPacienteBE, MutualPlanGridView, IContextInformation, IParam, Param, CommonValuesEnum, TipoParametroEnum, CommonParams, AppConstants, MotivoConsultaEnum } from '../../../model/index';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { ServiceError } from '../../../model/common.model';


import { PatienMedicalInsuranceGridComponent } from '../patien-medical-insurance-grid/patien-medical-insurance-grid.component';

@Component({
  selector: 'app-patient-manger',
  templateUrl: './patient-manger.component.html',
  encapsulation: ViewEncapsulation.None
})

export class PatientMangerComponent implements OnInit {

  globalError: ServiceError;
  isEdit: boolean=false;
  currentPatient: PatientBE;
  currentPatient$: Observable<PatientBE>;
  currentMutual_toAdd: MutualPlanGridView;
  currentMedicalInsuranceByPatient: MutualPorPacienteBE;
  mutualPorPacienteAuxList: MutualPorPacienteBE[];
  private medicalInsuranceByPatientList$: Observable<MutualPorPacienteBE[]>;
  @Input()
  public motivoConsulta :number;

  @ViewChild('patienMedicalInsuranceGridComponent',{ static: false }) patienMedicalInsuranceGridComponent: PatienMedicalInsuranceGridComponent;
  

  constructor(private route: ActivatedRoute,
    private patientService: PatientsService,
    private commonService: CommonService,
    private medicalInsuranceService: MedicalInsuranceService
    ) { }

  ngOnInit() {
    
    this.preInitializePatient();
  
 }

  medicalInsuranceByPatientList(item: any) {

    //this.addItem_mutualPorPacienteAuxList_Source.next(item);
  }


  private preInitializePatient() {

    this.currentPatient = new PatientBE();
    this.currentPatient.Persona = new PersonBE();
    this.currentPatient.Mutuales = [];
    this.mutualPorPacienteAuxList = [];
    var id: any;

    this.route.params.subscribe(params => {
      id = params;
      if (id.id != null)
      {
        this.motivoConsulta = MotivoConsultaEnum.ActualizarPaciente;
        this.isEdit = true;
      }
      else
      {
        this.isEdit = false;
        this.motivoConsulta = MotivoConsultaEnum.CrearPaciente;
      }
        
    });

    if (this.isEdit) {
      this.commonService.Set_mainComponentTitle("Gestión de pacientes  [Edición]" );
      //Busco el paciente
      this.currentPatient$ = this.patientService.getPatientById(id.id);

      this.currentPatient$.subscribe(
        res => {
          this.currentPatient = res;

          if (this.currentPatient != null) {
            this.motivoConsulta = MotivoConsultaEnum.ActualizarPaciente;
            this.mutualPorPacienteAuxList = this.currentPatient.Mutuales;
          }
          else {
            this.globalError = new ServiceError();
            this.globalError.message = "El paciente no existe en nuestra base de datos ";
           
          }
        },
        err => {
          
          this.globalError = err;
        }
      );
    }

    //if is create 
    if (this.isEdit == false) {
      this.motivoConsulta = MotivoConsultaEnum.CrearPaciente;

      this.currentPatient.FechaAlta = new Date();
      this.currentPatient.Persona.FechaNacimiento = new Date();
      this.currentPatient.Persona.NroDocumento = "0";
      this.commonService.Set_mainComponentTitle("Gestión de pacientes  [Alta]" );
    }
  }
  
  OnComponentError_personCard(err: ServiceError) {
    
      
       this.globalError = err;
     }
 
  OnComponentError_MedidalInsurance($event){
    this.globalError = $event;
  
  }


  //viene de la lista de todas las mutuales
  onMedicalInsuranceChanged($event) {
    this.currentMutual_toAdd = $event;
    this.currentPatient.Mutuales= $event;
    //document.querySelector('#currentMutual_toAdd_div').innerHTML = this.currentMutual_toAdd.Nombre + ' ' + this.currentMutual_toAdd.ComercialCode;
  }
 
  onMedicalInsuranceByPatientChanged($event) {
    this.currentMedicalInsuranceByPatient = $event;
    
  }

  addMedicalInsurance() {

    var item: MutualPorPacienteBE = new MutualPorPacienteBE();

    var existe = this.mutualPorPacienteAuxList.some(p => p.IdMutual == this.currentMutual_toAdd.MutualId);

    if (existe) {
      //Esto se hace por si la mutual habia sido eliminada de la grilla pero si e una q esta en bd todavia no se quita de MutualListAux

      var m = this.mutualPorPacienteAuxList.find(p => p.IdMutual == this.currentMutual_toAdd.MutualId);

      m.IsActive = true;
      m.PlanId = this.currentMutual_toAdd.PlanId;
      m.EntityState = 'Changed';
  
      return;
    }

    item.IdMutual = this.currentMutual_toAdd.MutualId;
    item.NombreMutual = this.currentMutual_toAdd.Nombre + ' plan ' + this.currentMutual_toAdd.ComercialCode;

    item.PatientId = this.currentPatient.PatientId;
    item.PlanId = this.currentMutual_toAdd.PlanId;
    item.IsActive = true;
    this.mutualPorPacienteAuxList.push(item);


    this.medicalInsuranceByPatientList(this.mutualPorPacienteAuxList);

    this.patienMedicalInsuranceGridComponent.showMedicalInsuranceByPatientList();
  }


  private createPatient() {
    var res$ = this.patientService.createPatientsService$(this.currentPatient, null);
    res$.subscribe(
      res => {
        alert('Paciente creado ok');
      },
      err => {
        this.globalError = err.error;
      }
    );

  }

  private updatePatient() {
    var res$ = this.patientService.updatePatientsService$(this.currentPatient, this.mutualPorPacienteAuxList, null);
    res$.subscribe(res => {
      alert('Actualizado con éxito');
    },
    err => {
      this.globalError = err.error;
    });
  }

}
