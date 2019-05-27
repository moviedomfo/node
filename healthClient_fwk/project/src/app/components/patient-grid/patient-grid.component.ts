import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ServiceError, PatientBE, IPatient, IPerson } from 'src/app/model';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/service/common.service';
import { PatientsService } from 'src/app/service/patients.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-patient-grid',
  templateUrl: './patient-grid.component.html',
  styleUrls: ['./patient-grid.component.css']
})
export class PatientGridComponent implements AfterViewInit {

  displayedColumns: string[] = ['Id', 'Nombre', 'NroDocumento', 'FechaAlta'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private IPersonlist: IPerson[];
  private dataSource = new MatTableDataSource<IPerson>(this.IPersonlist);
  private lenght = 1000;
  private pageSize = 10;
  private pageIndex= 0;
  private globalError: ServiceError;
  private patientList: PatientBE[];
  private filter: string;

  loading:boolean=false  ;

  pageActual: number = 1;

  constructor(
    private commonService: CommonService,
    private patientsService: PatientsService,
    private spinner: NgxSpinnerService) {

    this.patientList = [];
    this.IPersonlist = [];
    this.dataSource = new MatTableDataSource<IPerson>(this.IPersonlist);
  }



  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 7;
    this.showSpinner('spinner2');
    this.retrivePatients(0,this.pageSize);
    // this.showSpinner('spinner2');
    // this.paginator.page
    // .pipe(
    //     tap(() => this.dataSource)
    // ).subscribe();
  }
  ngOnInit(): void {
    //this.showSpinner('spinner2');

  }



  retrivePatients(pageIndex,pageSize) {
    let patientList$: Observable<PatientBE[]>;
    //this.spinner.show('spinner1');
    this.loading=true;
    //patientList$ = this.patientsService.retrivePatients$(this.txtQuery,this.paginator.pageIndex,this.paginator.pageSize);
    patientList$ = this.patientsService.retrivePatients$(this.filter,pageIndex,pageSize);

    patientList$.subscribe((res: PatientBE[]) => {
      this.patientList = res;
      this.parceToIPerson();
      this.hideSpinner('spinner2');
      this.loading=false;
    },
      err => {
        this.hideSpinner('spinner2');
        this.loading=false;
        this.globalError = err;
      }
    );

  }

  parceToIPerson() {


    this.patientList.forEach(p => {
      this.IPersonlist.push(
        {
          Id: p.PatientId,
          Nombre: p.Persona.Apellido + ',' + p.Persona.Nombre,
          NroDocumento: p.Persona.NroDocumento,
          FechaAlta: p.FechaAlta
        }
      );
    });
    

    var data = this.getPagedData(this.IPersonlist);
    this.dataSource = new MatTableDataSource(data);

  }

  //paginacion en front end
  getPagedData(data: IPerson[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }
  //filtro en front end
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  onPageChange(e){
    const previusPageIndex=e.previusPageIndex;
    this.pageIndex=e.pageIndex;
    this.pageSize=e.pageSize;
    this.lenght=e.lenght;

    this.retrivePatients(this.pageIndex,this.pageSize);
  }



  showSpinner(name: string) {
    //this.spinner.show(name);
    this.spinner.show(name,
      {
        type: 'ball-clip-rotate-multiple',//'square-spin',
        size: 'medium',
        bdColor: 'rgba(100,149,237, .8)',
        color: 'white',
        fullScreen: false
      }
    );
  }

  hideSpinner(name: string) {
    this.spinner.hide(name);
  }



}

