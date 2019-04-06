import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { ViewChild, ElementRef, Renderer2, AfterContentInit, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { ServiceError } from '../../../model/common.model';
import { ResourceSchedulingBE } from "../../../model/profesional.model";

// rich grid and rich grid declarative
import { DateComponent } from "../../../common-components/ag-grid/date.component";
import { HeaderComponent } from "../../../common-components/ag-grid/header.component";
import { HeaderGroupComponent } from "../../../common-components/ag-grid/header-group.component";


import { WeekDaysCheckEditComponent } from "../../../common-components/week-days-check-edit/week-days-check-edit.component";
import { ControlContainer, NgForm } from '@angular/forms';
import { GridOptions, ColumnApi } from 'ag-grid-community';

@Component({
  selector: 'app-resource-scheduling-grid',
  templateUrl: './resource-scheduling-grid.component.html',
  encapsulation: ViewEncapsulation.None

})


export class ResourceSchedulingGridComponent implements OnInit {

  globalError: ServiceError;
  @Input()
  profesionalResourceSchedulingList: ResourceSchedulingBE[];
  @Output() onResourceSchedulingChanged = new EventEmitter<ResourceSchedulingBE>();

  currentResourceScheduling: ResourceSchedulingBE;

  private columnDefs: any[];
  private gridOptions: GridOptions;
  private icons: any;
  
  private columnApi: ColumnApi;

  constructor() { }

  ngOnInit() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.dateComponentFramework = DateComponent;
    this.gridOptions.defaultColDef = {
      headerComponentFramework: <{ new(): HeaderComponent }>HeaderComponent,
      headerComponentParams: {
        menuIcon: 'fa-bars'
      }

    }
    this.gridOptions.rowData = this.profesionalResourceSchedulingList;

    this.gridOptions.floatingFilter = true;

    this.createColumnDefs();
    this.gridOptions.columnDefs = this.columnDefs;

  }

  private createColumnDefs() {
    this.columnDefs = [
      { headerName: "Descripción", field: "Description", width: 200, pinned: true, filter: 'text' },
      { headerName: "Hora inicio", field: "TimeStart", width: 100, pinned: false, filter: 'text' },
      { headerName: "Hora fin", field: "TimeEnd", width: 100, pinned: false, filter: 'text' },
      { headerName: "Días fin", field: "WeekDays_List", width: 300, pinned: false },
      { headerName: "Duración (min)", field: "Duration", width: 100, pinned: false }
    ];
  }
  private onReady(params) {
    this.gridOptions.api = params.api;
    this.columnApi = params.columnApi;
  }

  public showGrid() {

    this.gridOptions.api.setRowData(this.profesionalResourceSchedulingList);
  }

  onResourceSheduler_cellClicked($event) {
    this.currentResourceScheduling = $event.node.data;

    //document.querySelector('#selectedRows').innerHTML = this.currentMedicalInsuranceByPatient.Nombre;
    this.onResourceSchedulingChanged.emit(this.currentResourceScheduling);

  }
}
