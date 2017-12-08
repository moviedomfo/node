import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ProfesionalService, CommonService } from '../../service/index';
import { ProfesionalBE, PersonBE,  GetProfesionalRes,HealthInstitution_ProfesionalBE, ResourceSchedulingBE,User,IContextInformation, IParam, Param, CommonValuesEnum, TipoParametroEnum, CommonParams, HealtConstants ,contextInfo} from '../../model/index';
import { FormGroup } from '@angular/forms';
import { ViewChild, ElementRef, Renderer2, AfterContentInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ServiceError } from '../../model/common.model';


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


  constructor(private route: ActivatedRoute,
    private profesionalService: ProfesionalService,
    private commonService: CommonService) { 
    
   
      
    }


    ngAfterViewInit(): void {
   
     }
    
  ngOnInit() {
    
    this.preInitialize();
    
  }

  private preInitialize() {

    //alert('ngOnInit preInitialize ProfesionalManageComponent');
    this.currentProfesional = new ProfesionalBE();
    this.currentProfesional.Persona = new PersonBE();
    
    
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
  
  OnComponentError_profesionalCard(err: ServiceError) {
       this.globalError = err;
     }


     createProfesionalt   (){
       
     }

     updateProfesionalt   (){

     }
}
