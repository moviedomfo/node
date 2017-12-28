import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ProfesionalService, CommonService } from '../../../service/index';
import { ProfesionalBE, PersonBE,  GetProfesionalRes,HealthInstitution_ProfesionalBE, ResourceSchedulingBE,User,IContextInformation, IParam, Param, CommonValuesEnum, TipoParametroEnum, CommonParams, HealtConstants ,contextInfo} from '../../../model/index';
import { FormGroup } from '@angular/forms';
import { ViewChild, ElementRef, Renderer2, AfterContentInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ServiceError } from '../../../model/common.model';
import { ModalDialogComponent } from '../../../commonComponents/modal-dialog/modal-dialog.component';

import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { ResourceSchedulingManageComponent } from "../resource-scheduling-manage/resource-scheduling-manage.component";
import { ResourceSchedulingGridComponent } from "../resource-scheduling-grid/resource-scheduling-grid.component";

@Component({
  selector: 'app-profesional-manage',
  templateUrl: './profesional-manage.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ProfesionalManageComponent implements AfterViewInit {
  globalError: ServiceError;
  public currentProfesional: ProfesionalBE;
  currentResourceSchedulingList:ResourceSchedulingBE[];
  currentHealthInstitution_ProfesionalBE:HealthInstitution_ProfesionalBE;
  currentUser:User;
  getProfesionalRes$: Observable<GetProfesionalRes>;
  isEdit:boolean;
  isEditMode_resource_scheduling:boolean;

  @ViewChild('resourceSchedulingManageComponent1') resourceSchedulingManageComponent: ResourceSchedulingManageComponent;
  @ViewChild('resourceSchedulingGrid1') resourceSchedulingGridComponent: ResourceSchedulingGridComponent;
  
  constructor(private route: ActivatedRoute,
    private profesionalService: ProfesionalService,
    private commonService: CommonService,
    private dialogService:DialogService 
    ) { 
    
      //super(dialogService);
      
    }


    ngAfterViewInit(): void {
   
     }
    
  ngOnInit() {
    
    this.preInitialize();
    
  }

  private preInitialize() {

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
     
      //Busco el paciente
      this.getProfesionalRes$ = this.profesionalService.getProfesionalService$(true,true,id.id,contextInfo.UserId,HealtConstants.DefaultHealthInstitutionId,true);
      
      this.getProfesionalRes$.subscribe(
        res => {
       
          this.currentProfesional = res.ProfesionalBE;
          
          if (this.currentProfesional != null) {
            
            this.currentResourceSchedulingList = res.ResourceSchedulingList;
            this.currentHealthInstitution_ProfesionalBE = res.HealthInstitution_ProfesionalBE;
            this.currentUser = res.User;
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

      this.currentProfesional.IdEspecialidad = CommonParams.SeleccioneUnaOpcion.IdParametro;
      this.currentProfesional.IdProfesion = CommonParams.SeleccioneUnaOpcion.IdParametro;
      this.currentProfesional.FechaAlta = new Date();
      this.currentProfesional.Persona.FechaNacimiento = new Date();
      this.currentProfesional.Persona.NroDocumento = "0";
      this.currentUser= new  User();
    }
  }
  btnAddResorceSheduling(){
    
  }
  OnComponentError_profesionalCard(err: ServiceError) {
       this.globalError = err;
     }


     OnResourceCreated(resosurceSheduling:ResourceSchedulingBE){

     }

   



  show_resource_scheduling_dialog(isEdit:boolean,resosurceSheduling:ResourceSchedulingBE){
    this.isEditMode_resource_scheduling=isEdit;
    
  }
  
  resource_scheduling_dialog_confirm() {
    // this.result = false;
    // this.close();
  }
  resource_scheduling_dialog_close() {
    
  }

  onResourceSchedulingChanged(currentResourceScheduling :ResourceSchedulingBE){

  }

  createProfesional   (){
    
  }

  updateProfesional   (){

  }
  resource_scheduling_dialog_Acept(){
    
    var resourceSchedulin_copy = Object.assign({}, this.resourceSchedulingManageComponent.currentResourceScheduling);
   
    this.currentResourceSchedulingList.push(resourceSchedulin_copy);
    alert(JSON.stringify( resourceSchedulin_copy));
    alert(JSON.stringify( this.currentResourceSchedulingList));
  }
}
