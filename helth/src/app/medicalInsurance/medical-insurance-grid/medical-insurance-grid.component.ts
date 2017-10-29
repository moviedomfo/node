import { Component, OnInit } from '@angular/core';
//permmite cambiar la variable obsevada
import { Subject } from 'rxjs/Subject';
//permite observar
import { Observable } from 'rxjs/Observable';
import { MutualBE } from '../../model/index';
import { PatientsService, CommonService, MedicalInsuranceService } from '../../service/index';
// rich grid and rich grid declarative
import { DateComponent } from "../../commonComponents/ag-grid/date.component";
import { HeaderComponent } from "../../commonComponents/ag-grid/header.component";
import { HeaderGroupComponent } from "../../commonComponents/ag-grid/header-group.component";
import { GridOptions } from "ag-grid/main";
import { RowNode } from 'ag-grid/dist/lib/entities/rowNode';

@Component({
    selector: 'app-medical-insurance-grid',
    templateUrl: './medical-insurance-grid.component.html',
    styleUrls: ['./medical-insurance-grid.component.css']
})
export class MedicalInsuranceGridComponent implements OnInit {
    private columnDefs: any[];
    private gridOptions: GridOptions;
    public currentMutual:MutualBE;
    private mutualList: MutualBE[];
    private mutualList$: Observable<MutualBE[]>;

    constructor(private medicalInsuranceService: MedicalInsuranceService) { }

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
        this.gridOptions.getContextMenuItems = this.getContextMenuItems.bind(this);
        this.gridOptions.floatingFilter = true;

        this.createColumnDefs();
        this.retriveAllObraSocial();
    }
    private getContextMenuItems(): any {
        let result: any = [
            { // custom item
                name: 'Alert ',
                action: function () {
                    window.alert('Alerting about ');
                },
                cssClasses: ['redFont', 'bold']
            }];
        return result;
    }
    private createColumnDefs() {
        this.columnDefs = [
            { headerName: "Nombre", field: "Nombre", width: 150, pinned: true, filter: 'text' },
            { headerName: "Exige coseguro", field: "ExigeCoseguro", width: 150, pinned: true, filter: 'text' },
            { headerName: "CUIT", field: "CUIT", width: 200, pinned: true }
        ];
    }

    retriveAllObraSocial() {
       
        this.mutualList$ = this.medicalInsuranceService.retriveAllObraSocialService$("");
        this.mutualList$.subscribe(
            res => {
                
                this.mutualList = res;
            }
        );

    }

    onObraSocialGridCellClick($event) {
        //console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
        //document.querySelector('#selectedRows').innerHTML = $event;
        //item : RowNode;
        this.currentMutual =$event.node.data;
        //alert(JSON.stringify(this.currentMutual)); 
        document.querySelector('#selectedRows').innerHTML = this.currentMutual.Nombre;
        
    }
     onObraSocialSelectionChanged() {
        var selectedRows = this.gridOptions.api.getSelectedRows();
        var selectedRowsString = '';
        selectedRows.forEach( function(selectedRow, index) {
            if (index!==0) {
                selectedRowsString += ', ';
            }
            selectedRowsString += selectedRow.Nombre;
        });
        document.querySelector('#selectedRows').innerHTML = selectedRowsString;
    }
}
