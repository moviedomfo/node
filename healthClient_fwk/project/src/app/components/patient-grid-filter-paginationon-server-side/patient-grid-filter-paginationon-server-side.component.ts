import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ServiceError, PatientBE, IPatient, IPerson, ProfesionalesGridBE, PersonBE, GridElement } from 'src/app/model';
import { Observable, fromEvent } from 'rxjs';
import { CommonService } from 'src/app/service/common.service';
import { PatientsService } from 'src/app/service/patients.service';
import {  MatPaginator, MatSort } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PatientsDataSource } from './PatientsDatasource';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-grid-filter-paginationon-server-side',
  templateUrl: './patient-grid-filter-paginationon-server-side.component.html',
  styleUrls: ['./patient-grid-filter-paginationon-server-side.component.css']
})
export class PatientGridFilterPAginationonServerSideComponent implements AfterViewInit {

  displayedColumns: string[] = ['Id', 'Nombre', 'NroDocumento', 'FechaAlta'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  private dataSource: PatientsDataSource;
  //private lenght = 1000;
  private pageSize = 10;
  private pageIndex= 0;
  private globalError: ServiceError;
  private patientList: PatientBE[];
  private selectedItem: PatientBE;
  
  constructor(
    private patientsService: PatientsService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) {

       this.patientList = [];
      this.selectedItem = new PatientBE();
      this.selectedItem.Persona= new  PersonBE();
  }



 
  ngOnInit(): void {
    this.patientList = this.route.snapshot.data["patientList"];
    this.dataSource = new PatientsDataSource(this.patientsService);
    this.dataSource.loadItems("",0,100);
  }


  ngAfterViewInit(): void {

    // server-side search
    //This Observable will emit a value every time that a new keyUp event occurs
    //ebounceTime(150):      The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms.
    //distinctUntilChanged(): This operator will eliminate duplicate values
    fromEvent(this.input.nativeElement,'keyup')
    .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => { //e can now trigger a page load by passing the query string, the page size and page index to the the Data Source via the tap() operator.
            this.paginator.pageIndex = 0;
            this.loadItemsPage();
        })
    )
    .subscribe();
    
   this.paginator.page
           .pipe(
               tap(() => this.loadItemsPage())
           )
           .subscribe();

 }
 
  loadItemsPage() {
    this.dataSource.loadItems('',this.paginator.pageIndex,this.paginator.pageSize);
}

  
  // parceToIPerson() {


  //   this.patientList.forEach(p => {
  //     this.IPersonlist.push(
  //       {
  //         Id: p.PatientId,
  //         Nombre: p.Persona.Apellido + ',' + p.Persona.Nombre,
  //         NroDocumento: p.Persona.NroDocumento,
  //         FechaAlta: p.FechaAlta
  //       }
  //     );
  //   });
    

  //   var data = this.getPagedData(this.IPersonlist);
  //   this.dataSource = new MatTableDataSource(data);

  // }

  //paginacion en front end
  getPagedData(data: IPerson[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }
  


  onPageChange(e){
    const previusPageIndex=e.previusPageIndex;
    this.pageIndex=e.pageIndex;
    this.pageSize=e.pageSize;
    //this.lenght=e.lenght;

    //this.retrivePatients();
  }

  onRowClick(row){
    //alert(JSON.stringify(row));
    this.selectedItem = row;
    row.highlighted = !row.highlighted
    //alert(JSON.stringify(this.selectedItem));
  }

  // highlight(element: GridElement) {
  //   element.highlighted = !element.highlighted;
  // }
}



