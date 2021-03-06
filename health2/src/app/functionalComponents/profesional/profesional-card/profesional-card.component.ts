import { Component, AfterViewInit, ViewEncapsulation , Input,Output,EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';
import { ProfesionalService, CommonService } from '../../../service/index';
import { ProfesionalBE, PersonBE,  GetProfesionalRes, ResourceSchedulingBE,User,IContextInformation, IParam, Param, CommonValuesEnum, TipoParametroEnum, CommonParams, AppConstants ,contextInfo} from '../../../model/index';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { ServiceError } from '../../../model/common.model';
import { ControlContainer, NgForm } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-profesional-card',
  templateUrl: './profesional-card.component.html',
  encapsulation: ViewEncapsulation.None,
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class ProfesionalCardComponent implements AfterViewInit {
 
  globalError: ServiceError;
  @Input() public currentProfesional: ProfesionalBE;
  @Input() public motivoConsulta: number;
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
