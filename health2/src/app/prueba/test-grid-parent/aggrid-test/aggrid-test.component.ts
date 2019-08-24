import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DateComponent } from "../../../common-components/ag-grid/date.component";
import { HeaderComponent } from "../../../common-components/ag-grid/header.component";
import { HeaderGroupComponent } from "../../../common-components/ag-grid/header-group.component";
import { PersonBE } from '../../../model/index';
import { GridOptions } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
    selector: 'app-aggrid-test',
    templateUrl: './aggrid-test.component.html'
})
export class AggridTestComponent implements OnInit {
    //  patientList$:Observable<MutualPorPacienteBE[]>;
    //@Input()
    public rowData: PersonBE[];
    private gridOptions: GridOptions = <GridOptions>{};
    @ViewChild('agGridTest', { static: false }) agGrid: AgGridAngular;

    
    public columnDefs = [
        { headerName: "Nombre", field: "Nombre" },
        { headerName: "IdPersona", field: "IdPersona" },
        { headerName: "NroDocumento", field: "NroDocumento" }
    ];
    constructor() { }

    ngOnInit() {
        // we pass an empty gridOptions in, so we can grab the api out
        //this.gridOptions = <GridOptions>{};   
        //   this.gridOptions.dateComponentFramework = DateComponent;
        //   this.gridOptions.defaultColDef = {
        //       headerComponentFramework: <{ new(): HeaderComponent }>HeaderComponent,
        //       headerComponentParams: {
        //           menuIcon: 'fa-bars'
        //       }
        //   }
        //this.gridOptions.rowData= this.patientList;

        //this.gridOptions.columnDefs=this.columnDefs;
        this.rowData = [];
             
          
    }

    ///Permite agregar un elemento a la grilla desde el exterior
    public appendNewItem(nombre: string, id: number) {

        var item: PersonBE = new PersonBE();
        item.Nombre = nombre;
        item.IdPersona = id;

        this.rowData.push(item);
        this.agGrid.api.setRowData( this.rowData);
    }

    ///Este metodo solo tiene validez luego de que onReady suceda
    public Refresh() {
        // if (this.gridOptions.api === undefined) return;
        // //this.api.setRowData(this.patientList)
         //this.gridOptions.api.setRowData(this.rowData);
         //this.agGrid.api.setRowData(this.rowData);

    }






    ///Determina que la grilla esta lista y la api puede ser creada
    private onReady(params) {
        this.gridOptions.api = params.api;
        //this.columnApi = params.columnApi;
    }

    getSelectedRows() {
        const selectedNodes = this.agGrid.api.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');
        alert(`Selected nodes: ${selectedDataStringPresentation}`);
    }
}
