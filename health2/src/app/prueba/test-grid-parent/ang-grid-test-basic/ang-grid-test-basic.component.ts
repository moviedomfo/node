
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';


@Component({
  selector: 'app-ang-grid-test-basic',
  templateUrl: './ang-grid-test-basic.component.html',
  styleUrls: ['./ang-grid-test-basic.component.scss']
})

export class AngGridTestBasicComponent implements OnInit {
  @ViewChild('agGridTest', { static: false }) agGrid: AgGridAngular;
  public columnDefs = [
    { headerName: 'Make', field: 'make' },
    { headerName: 'Model', field: 'model' },
    { headerName: 'PriceHeader', field: 'price' }
  ];

  // public rowData = [
  //   { make: 'Toyota', model: 'Celica', price: 35000 },
  //   { make: 'Ford', model: 'Mondeo', price: 32000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 }
  // ];

  public rowData =[];
  constructor() { }

  ngOnInit() {
   this. rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
      ];

  }


  public addItem() {
    var item = { make: 'Jeep', model: 'Renegade', price: 103300 };
    this.rowData.push(item);
    this.agGrid.api.setRowData(this.rowData);
    //this.agGrid.api.refreshCells();
  }
}
