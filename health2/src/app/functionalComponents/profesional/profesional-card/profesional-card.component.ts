import { Component, OnInit, ViewEncapsulation , Input,Output,EventEmitter} from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ProfesionalService, CommonService } from '../../../service/index';
import { ProfesionalBE, PersonBE,  GetProfesionalRes, ResourceSchedulingBE,User,IContextInformation, IParam, Param, CommonValuesEnum, TipoParametroEnum, CommonParams, HealtConstants ,contextInfo} from '../../../model/index';
import { FormGroup } from '@angular/forms';
import { ViewChild, ElementRef, Renderer2, AfterContentInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ServiceError } from '../../../model/common.model';

@Component({
  selector: 'app-profesional-card',
  templateUrl: './profesional-card.component.html',
  
  encapsulation: ViewEncapsulation.None
})
export class ProfesionalCardComponent implements AfterViewInit {
 
  globalError: ServiceError;
  @Input() public currentProfesional: ProfesionalBE;
  @Output() OnComponentError = new EventEmitter<ServiceError>();
  especialidadList: Param[];
  profesionList: Param[];
  constructor(private commonService: CommonService) { }

  ngAfterViewInit(): void {
   
  }
  
  ngOnInit() {
    
    
    var especialidadList$ :Observable<Param[]>= this.commonService.searchParametroByParams$(TipoParametroEnum.Especialidad, null);
    especialidadList$.subscribe(
      res => {
        this.especialidadList = this.commonService.appendExtraParamsCombo(res, CommonParams.SeleccioneUnaOpcion.IdParametro);
      },
      err => {

        this.OnComponentError.emit(err);
      }
    );


    var profesionList$ :Observable<Param[]>= this.commonService.searchParametroByParams$(TipoParametroEnum.Profesion, null);
    profesionList$.subscribe(
      res => {
        this.profesionList = this.commonService.appendExtraParamsCombo(res, CommonParams.SeleccioneUnaOpcion.IdParametro);
      },
      err => {

        this.OnComponentError.emit(err);
      }
    );

  }

  OnComponentError_personCard(err: ServiceError) {
    this.globalError = err;
  }
}
