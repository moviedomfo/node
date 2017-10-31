
import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { PatientsService, CommonService, MedicalInsuranceService } from '../../service/index';
import { PatientBE, PersonBE, MutualPorPacienteBE, MutualPlanGridView, IContextInformation, IParam, Param, CommonValuesEnum, TipoParametroEnum, CommonParams, HealtConstants } from '../../model/index';
import { FormGroup } from '@angular/forms';
import { ViewChild, ElementRef, Renderer2, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-patient-manger',
  templateUrl: './patient-manger.component.html',
  styleUrls: ['./patient-manger.component.css']
})
export class PatientMangerComponent implements OnInit {
  isEdit: boolean;
  currentPatient: PatientBE;
  currentPatient$: Observable<PatientBE>;
  currentMutual_toAdd: MutualPlanGridView;
  currentMutual_Patient: MutualPlanGridView;
  mutualPorPacienteAuxList: MutualPorPacienteBE[];

  constructor(private route: ActivatedRoute,
    private patientService: PatientsService,
    private commonService: CommonService,
    private medicalInsuranceService: MedicalInsuranceService,
    private rd: Renderer2) { }

  ngOnInit() {
    this.preInitializePatient();
  }


  private preInitializePatient() {
    this.currentPatient = new PatientBE();
    this.currentPatient.Persona = new PersonBE();
    this.currentPatient.Mutuales = [];
    this.mutualPorPacienteAuxList = [];
    var id: any;

    this.route.params.subscribe(params => {
      id = params
      if (id.id != null)
        this.isEdit = true;
    }
    );

    if (this.isEdit) {
      //Busco el paciente
      this.currentPatient$ = this.patientService.getPatientById(id.id);

      this.currentPatient$.subscribe(res => {
        this.currentPatient = res;

      })
    }


    if (this.isEdit == false) {

      //this.currentPerson.TipoDocumento=613;
      this.currentPatient.FechaAlta = new Date();
      //this.mutualPorPacienteAuxList = [];
    }


  }


  //viene de la lista de todas las mutuales
  onMedicalInsuranceChanged($event) {
    this.currentMutual_toAdd = $event;
  }
  addMedicalInsurance() {

    var item: MutualPorPacienteBE = new MutualPorPacienteBE();
    if (this.mutualPorPacienteAuxList.some(p => p.IdMutual == this.currentMutual_toAdd.MutualId)) {
      //Esto se hace por si la mutual habia sido eliminada de la grilla pero si e una q esta en bd todavia no se quita de MutualListAux
      var m = this.mutualPorPacienteAuxList.find(p => p.IdMutual == this.currentMutual_toAdd.MutualId)[0];
      m.IsActive = true;
      m.PlanId = this.currentMutual_toAdd.PlanId;
      m.EntityState = 'Changed';
      //gridControl_MutualXPatient.RefreshDataSource();
      return;
    }

    item.IdMutual = this.currentMutual_toAdd.MutualId;
    item.NombreMutual = this.currentMutual_toAdd.Nombre + ' plan ' + this.currentMutual_toAdd.ComercialCode;

    item.PatientId = this.currentPatient.PatientId;
    item.PlanId = this.currentMutual_toAdd.PlanId;
    item.IsActive = true;
    this.mutualPorPacienteAuxList.push(item);
    //this.currentPatient.Mutuales.push(item);
  }


  private createPatient() {
    this.patientService.createPatientsService$(this.currentPatient, null);

  }
  private updatePatient() {
    var res$ = this.patientService.updatePatientsService$(this.currentPatient, this.mutualPorPacienteAuxList, null);
    res$.subscribe(res => {
      alert('Actualizado con exito');
    })
  }

}
