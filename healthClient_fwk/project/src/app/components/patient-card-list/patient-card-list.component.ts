import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { PatientsService } from 'src/app/service/patients.service';
import { PatientBE, ServiceError } from 'src/app/model';
import { Observable, fromEvent, Subscription, of, BehaviorSubject } from 'rxjs';
import { PatientsCardDataSource } from './PatientsCardDatasource';
import { throttleTime, map, scan, debounceTime, distinctUntilChanged, tap,filter, startWith } from 'rxjs/operators';


//https://www.youtube.com/watch?v=CRJxOA5FZZE

@Component({
  selector: 'app-patient-card-list',
  templateUrl: './patient-card-list.component.html',
  styleUrls: ['./patient-card-list.component.css']
})
export class PatientCardListComponent implements AfterViewInit {
  @ViewChild('btn1') button: ElementRef;
  @ViewChild('input') input: ElementRef;
  private globalError: ServiceError;
  private patientList: PatientBE[];
  private dataSource: PatientsCardDataSource;

  private count;


  private subscription: Subscription;
  constructor(private patientsService: PatientsService, ) { }

  ngAfterViewInit(): void {

  
  }

  ngOnInit() {
    this.patientList = [];

    //this.dataSource = new PatientsCardDataSource(this.patientsService);
    //this.retrivePatients() ;
  }

  retrivePatients() {
    let patientList$: Observable<PatientBE[]>;
    patientList$ = this.patientsService.retrivePatients$("", null, null);
    patientList$.subscribe((res: PatientBE[]) => {
      this.patientList = res;

    },
      err => {

        this.globalError = err;
      }
    );

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

