import { Component, OnInit, ViewEncapsulation } from '@angular/core';


import { Observable } from 'rxjs';
import { ProfesionalService, CommonService } from '../../../service/index';
import { ProfesionalBE, PersonBE, GetProfesionalRes, HealthInstitution_ProfesionalBE, ResourceSchedulingBE, User, IContextInformation, IParam, Param, CommonValuesEnum, TipoParametroEnum, CommonParams, AppConstants, contextInfo, Rol } from '../../../model/index';
import { FormGroup } from '@angular/forms';
import { ViewChild, ElementRef, Renderer2, AfterContentInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ServiceError } from '../../../model/common.model';
import { ModalDialogComponent } from '../../../common-components/modal-dialog/modal-dialog.component';

import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { ResourceSchedulingManageComponent } from "../resource-scheduling-manage/resource-scheduling-manage.component";
import { ResourceSchedulingGridComponent } from "../resource-scheduling-grid/resource-scheduling-grid.component";
import { WeekDaysCheckEditComponent } from "../../../common-components/controls/week-days-check-edit/week-days-check-edit.component";
import { SessionSettingComponent } from "../../security/sessionSetting.component";
import { MotivoConsultaEnum } from "../../../model/common.constants";

@Component({
  selector: 'app-profesional-manage',
  templateUrl: './profesional-manage.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ProfesionalManageComponent implements AfterViewInit {
  
  globalError: ServiceError;
  public currentProfesional: ProfesionalBE;
  currentResourceSchedulingList: ResourceSchedulingBE[];
  currentHealthInstitution_ProfesionalBE: HealthInstitution_ProfesionalBE;
  currentUser: User;
  getProfesionalRes$: Observable<GetProfesionalRes>;
  isEdit: boolean=false;
  isEditMode_resource_scheduling: boolean;
  currentResourceScheduling = new ResourceSchedulingBE();
  motivoConsulta: number;
  @ViewChild('resourceSchedulingManageComponent1',{ static: false }) resourceSchedulingManageComponent: ResourceSchedulingManageComponent;
  @ViewChild('resourceSchedulingGrid1',{ static: false }) resourceSchedulingGridComponent: ResourceSchedulingGridComponent;
  @ViewChild('sessionSettingComponent',{ static: false }) sessionSettingComponent: SessionSettingComponent;
  

  constructor(private route: ActivatedRoute,
    private profesionalService: ProfesionalService,
    private commonService: CommonService,
    private dialogService: DialogService
  ) {  }


  ngAfterViewInit(): void {
    this.sessionSettingComponent.MachRolesGrid();

  }

  ngOnInit() {
    
    
    this.preInitialize();
    if (this.isEdit) {
      this.commonService.Set_mainComponentTitle("Gestión de profesionales [Edición]");
      this.motivoConsulta = MotivoConsultaEnum.ActualizarProfesional;
    }
    else {
      this.commonService.Set_mainComponentTitle("Gestión de profesionales [Alta]");
      this.motivoConsulta = MotivoConsultaEnum.CrearProfesional;
    }
  }

  private preInitialize() {
    this.isEditMode_resource_scheduling = false;

    this.resourceSchedulingManageComponent.currentResourceScheduling = this.currentResourceScheduling;
    //alert('ngOnInit preInitialize ProfesionalManageComponent');
    this.currentProfesional = new ProfesionalBE();
    this.currentProfesional.Persona = new PersonBE(-1, "");


    var id: any;

    this.route.params.subscribe(params => {
      id = params;
      if (id.id != null)
        this.isEdit = true;
    });

    if (this.isEdit) {
//      this.motivoConsulta = MotivoConsultaEnum.ActualizarProfesional;
      
      //Busco el paciente
      this.getProfesionalRes$ = this.profesionalService.getProfesionalService$(true, true, id.id, contextInfo.UserId, AppConstants.DefaultHealthInstitutionId, true);

      this.getProfesionalRes$.subscribe(
        res => {

          this.currentProfesional = res.Profesional;
          
          if (this.currentProfesional != null) {

            this.currentResourceSchedulingList = res.ResourceSchedulingList;
            this.currentHealthInstitution_ProfesionalBE = res.HealthInstitution_ProfesionalBE;
            this.currentUser = res.User;
           
          }
          else {
            this.globalError = new ServiceError();

            this.globalError.message = "El profesional no existe en nuestra base de datos ";
   
          }
        },
        err => {

          this.globalError = err;
        }
      );
    }

    //if is create 
    if (this.isEdit == false) {
      //this.motivoConsulta = MotivoConsultaEnum.CrearProfesional;
      this.currentProfesional.IdEspecialidad = CommonParams.SeleccioneUnaOpcion.IdParametro;
      this.currentProfesional.IdProfesion = CommonParams.SeleccioneUnaOpcion.IdParametro;
      this.currentProfesional.FechaAlta = new Date();
      this.currentProfesional.Persona.FechaNacimiento = new Date();
      this.currentProfesional.Persona.NroDocumento = "0";
      this.currentUser = new User();
    }


   
  }
 
  OnComponentError_profesionalCard(err: ServiceError) {
    this.globalError = err;
  }






  show_resource_scheduling_dialog(isEdit: boolean) {

    this.resourceSchedulingManageComponent.preinItialize();
    this.isEditMode_resource_scheduling = isEdit;
    this.resourceSchedulingManageComponent.currentResourceScheduling.ResourceId = this.currentProfesional.IdProfesional;
    this.resourceSchedulingManageComponent.currentResourceScheduling.ResourceType = null;

    //alert(this.isEditMode_resource_scheduling);
  }



  onResourceSchedulingChanged(currentResourceScheduling: ResourceSchedulingBE) {

  }


  @ViewChild('closeBtn',{ static: false }) closeBtn: ElementRef;
  
  OnResourceShedulingCreated(newResourceSheduling){
   

    //this.currentResourceSchedulingList.push(newResourceSheduling);
    this.resourceSchedulingGridComponent.showGrid();
    this.resourceSchedulingManageComponent.currentResourceScheduling = new ResourceSchedulingBE();
    this.closeBtn.nativeElement.click();
  }
  onSubmit(isValid: boolean) {

    
    if (!isValid) return;

    if (this.isEdit)
      this.updateProfesional();
    else
      this.createProfesional();

  }

  createProfesional() {
    alert('Entro en onSubmit createProfesional');

    var crearProfesional = this.profesionalService.crearProfesionalService$(
      this.currentProfesional,
      this.currentUser,
      this.currentHealthInstitution_ProfesionalBE.HealthInstitutionId,true);


      crearProfesional.subscribe(
        res => {
          if(res)
          {
            // int IdProfesional { get; set; }
            // Guid UserId { get; set; }
            this.currentProfesional.IdProfesional= res['IdProfesional'];
            this.currentUser.UserId = res['UserId'];
            
           alert('El profesional fue dado de alta correctamente !!');
          }
         
        },
        err => {
          this.globalError = err;
          
        }
      );
  }

  updateProfesional() {

  }

 btnTestClick()
 {
  this.sessionSettingComponent.MachRolesGrid();
 }
}
