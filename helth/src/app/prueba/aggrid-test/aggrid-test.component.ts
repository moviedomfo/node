import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
// rich grid and rich grid declarative
import { DateComponent } from "../../commonComponents/ag-grid/date.component";
import { HeaderComponent } from "../../commonComponents/ag-grid/header.component";
import { HeaderGroupComponent } from "../../commonComponents/ag-grid/header-group.component";
import {ColumnApi, GridApi, GridOptions} from "ag-grid/main";
import { RowNode } from 'ag-grid/dist/lib/entities/rowNode';
// src/SimpleGrid.ts 


import { MutualBE,MutualPorPacienteBE } from '../../model/index';

@Component({
  selector: 'app-aggrid-test',
  templateUrl: './aggrid-test.component.html',
  styleUrls: ['./aggrid-test.component.css']
})
export class AggridTestComponent implements OnInit {
  
    patientList:MutualPorPacienteBE[];
  private columnDefs: any[];
  //private gridOptions: GridOptions;
  private gridOptions: GridOptions = <GridOptions>{};
  
  private icons: any;
  private api: GridApi;
  private columnApi: ColumnApi;
  constructor() { }

 ngOnInit() {
      // we pass an empty gridOptions in, so we can grab the api out
      this.gridOptions = <GridOptions>{};   
      this.icons = {
        columnRemoveFromGroup: '<i class="fa fa-remove"/>',
        filter: '<i class="fa fa-filter"/>',
        sortAscending: '<i class="fa fa-long-arrow-down"/>',
        sortDescending: '<i class="fa fa-long-arrow-up"/>',
        groupExpanded: '<i class="fa fa-minus-square-o"/>',
        groupContracted: '<i class="fa fa-plus-square-o"/>',
        columnGroupOpened: '<i class="fa fa-plus-square-o"/>',
        columnGroupClosed: '<i class="fa fa-minus-square-o"/>'
    };
      this.gridOptions.dateComponentFramework = DateComponent;
      this.gridOptions.defaultColDef = {
          headerComponentFramework: <{ new(): HeaderComponent }>HeaderComponent,
          headerComponentParams: {
              menuIcon: 'fa-bars'
          }
     
      }
      this.gridOptions.rowData= this.patientList;
      
      this.gridOptions.floatingFilter = true;

      this.createColumnDefs();
      this.gridOptions.columnDefs=this.columnDefs;
      this.fillData();
     
     
  }

 private appendNewItem() {

     var item: MutualPorPacienteBE = new MutualPorPacienteBE();
     item.NombreMutual = "Mutial 333333";
     item.Id = 12;
     this.patientList.push(item);
     
     this.api.setRowData(this.patientList)
     //this.api.redrawRows({});
     //this.api.refreshCells({});
 }
  private createColumnDefs() {
    this.columnDefs = [
        { headerName: "Mutual", field: "NombreMutual", width: 150, pinned: true, filter: 'text' },
        { headerName: "Id", field: "Id", width: 150, pinned: true, filter: 'text' },
        { headerName: "Activa", field: "IsActive", width: 100, pinned: true }
    ];


}
private onReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
}
  private fillData() {

    this.patientList=[];

        var item: MutualPorPacienteBE=new MutualPorPacienteBE();
        item.NombreMutual="Mutial 1";
        item.Id=123211;
        this.patientList.push(item);
      
  }
}
