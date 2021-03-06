import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';
// rich grid and rich grid declarative
import { DateComponent } from "../../../common-components/controls/ag-grid/date.component";
import { HeaderComponent } from "../../../common-components/controls/ag-grid/header.component";
import { HeaderGroupComponent } from "../../../common-components/controls/ag-grid/header-group.component";



import { MutualBE, MutualPorPacienteBE } from '../../../model/index';
import { Subscription }   from 'rxjs';
import { GridOptions, ColumnApi } from 'ag-grid-community';
@Component({
    selector: 'app-patien-medical-insurance-grid',
    templateUrl: './patien-medical-insurance-grid.component.html'
})
export class PatienMedicalInsuranceGridComponent implements OnInit {
    subscription: Subscription;
    @Input()
    medicalInsuranceByPatientList: MutualPorPacienteBE[];
  
    private columnDefs: any[];
    private gridOptions: GridOptions;
    private icons: any;
 
    private columnApi: ColumnApi;
    @Output() onMedicalInsuranceByPatientChanged = new EventEmitter<MutualPorPacienteBE>();
    public currentMedicalInsuranceByPatient: MutualPorPacienteBE;

    constructor() { }

    ngOnInit() {
        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = <GridOptions>{};
        this.gridOptions.dateComponentFramework = DateComponent;
        this.gridOptions.defaultColDef = {
            headerComponentFramework: <{ new(): HeaderComponent }>HeaderComponent,
            headerComponentParams: {
                menuIcon: 'fa-bars'
            }

        }
        this.gridOptions.rowData = this.medicalInsuranceByPatientList;

        this.gridOptions.floatingFilter = true;

        this.createColumnDefs();
        this.gridOptions.columnDefs = this.columnDefs;



    }
    private onReady(params) {
        this.gridOptions.api = params.api;
        this.columnApi = params.columnApi;
    }
    public showMedicalInsuranceByPatientList() {
        
        this.gridOptions.api.setRowData(this.medicalInsuranceByPatientList);
    }

    private createColumnDefs() {
        this.columnDefs = [
            { headerName: "Mutual", field: "NombreMutual", width: 150, pinned: true, filter: 'text' },
            { headerName: "Nro Afiliado", field: "NroAfiliadoMutual", width: 150, pinned: true, filter: 'text' },
            { headerName: "Activa", field: "IsActive", width: 100, pinned: true }
        ];
    }
    onMedicalInsuranceByPatient_cellClicked($event) {
        this.currentMedicalInsuranceByPatient = $event.node.data;

        //document.querySelector('#selectedRows').innerHTML = this.currentMedicalInsuranceByPatient.Nombre;
        this.onMedicalInsuranceByPatientChanged.emit(this.currentMedicalInsuranceByPatient);

    }

}
