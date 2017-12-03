import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ProfesionalService, CommonService } from '../../service/index';
import { ProfesionalBE, PersonBE,  MutualPlanGridView, IContextInformation, IParam, Param, CommonValuesEnum, TipoParametroEnum, CommonParams, HealtConstants } from '../../model/index';
import { FormGroup } from '@angular/forms';
import { ViewChild, ElementRef, Renderer2, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ServiceError } from '../../model/common.model';


@Component({
  selector: 'app-profesional-manage',
  templateUrl: './profesional-manage.component.html',
  styleUrls: ['./profesional-manage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfesionalManageComponent implements OnInit {
  globalError: ServiceError;
  currentProfesiona: ProfesionalBE;
  currentProfesiona$: Observable<ProfesionalBE>;
  isEdit:boolean;
  constructor(private route: ActivatedRoute,
    private patientService: ProfesionalService,
    private commonService: CommonService,) { }

  ngOnInit() {
  }

}
