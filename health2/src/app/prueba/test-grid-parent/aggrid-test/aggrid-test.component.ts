import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';

import { Observable } from 'rxjs';
import { DateComponent } from "../../../common-components/ag-grid/date.component";
import { HeaderComponent } from "../../../common-components/ag-grid/header.component";
import { HeaderGroupComponent } from "../../../common-components/ag-grid/header-group.component";
import {MutualPorPacienteBE } from '../../../model/index';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-aggrid-test',
  templateUrl: './aggrid-test.component.html',
  styleUrls: ['./aggrid-test.component.css']
})
export class AggridTestComponent implements OnInit {
//  patientList$:Observable<MutualPorPacienteBE[]>;
  @Input()
  public patientList:MutualPorPacienteBE[];
  
  private columnDefs: any[];
  private gridOptions: GridOptions = <GridOptions>{};
  //private api: GridApi;
  
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
      this.gridOptions.rowData= this.patientList;
      this.createColumnDefs();
      this.gridOptions.columnDefs=this.columnDefs;

  }

 ///Permite agregar un elemento a la grilla desde el exterior
 private appendNewItem(nombre:string,id:number) {

     var item: MutualPorPacienteBE = new MutualPorPacienteBE();
     item.NombreMutual = nombre;
     item.Id = id;
     this.patientList.push(item);
     

 }

 ///Este metodo solo tiene validez luego de que onReady suceda
 public Refresh() {
     if (this.gridOptions.api === undefined) return;
     //this.api.setRowData(this.patientList)
     this.gridOptions.api.setRowData(this.patientList);
 }
 
  private createColumnDefs() {
    this.columnDefs = [
        { headerName: "Mutual", field: "NombreMutual", width: 150, pinned: true, filter: 'text' },
        { headerName: "Id", field: "Id", width: 150, pinned: true, filter: 'text' },
        { headerName: "Activa", field: "IsActive", width: 100, pinned: true }
    ];


}

///Determina que la grilla esta lista y la api puede ser creada
private onReady(params) {
    this.gridOptions.api = params.api;
    //this.columnApi = params.columnApi;
}

}
