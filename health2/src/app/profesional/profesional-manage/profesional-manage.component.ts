import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ProfesionalService, CommonService } from '../../service/index';
import { ProfesionalBE, PersonBE,  GetProfesionalRes, User,IContextInformation, IParam, Param, CommonValuesEnum, TipoParametroEnum, CommonParams, HealtConstants, ResourceSchedulingBE } from '../../model/index';
import { FormGroup } from '@angular/forms';
import { ViewChild, ElementRef, Renderer2, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ServiceError } from '../../model/common.model';


@Component({
  selector: 'app-profesional-manage',
  templateUrl: './profesional-manage.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ProfesionalManageComponent implements OnInit {
  globalError: ServiceError;
  currentProfesional: ProfesionalBE;
  currentResourceSchedulingList:ResourceSchedulingBE[];
  currentUser:User;
  getProfesionalRes$: Observable<GetProfesionalRes>;

  isEdit:boolean;
  constructor(private route: ActivatedRoute,
    private profesionalService: ProfesionalService,
    private commonService: CommonService,) { }

  ngOnInit() {
    this.preInitializeProf();
  }

  private preInitializeProf() {
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
      this.getProfesionalRes$ = this.profesionalService.getProfesionalService$(id.id,true);
    var GetProfesionalRes : GetProfesionalRes;
      this.getProfesionalRes$.subscribe(
        res => {
          this.currentProfesional = res.ProfesionalBE;
          if (this.currentProfesional == null) {
            this.currentResourceSchedulingList = res.ResourceSchedulingList;
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

      //this.currentPerson.TipoDocumento=613;
      this.currentProfesional.FechaAlta = new Date();
      this.currentProfesional.Persona.FechaNacimiento = new Date();
      this.currentProfesional.Persona.NroDocumento = "0";
    }
  }

  OnComponentError_personCard(err: ServiceError) {
    
      
       this.globalError = err;
     }
}
