import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { PatientsService } from 'src/app/service/patients.service';
import { PatientBE, ServiceError } from 'src/app/model';
import { Observable, fromEvent, Subscription, of, BehaviorSubject } from 'rxjs';
import { PatientsCardDataSource } from './PatientsCardDatasource';



//https://www.youtube.com/watch?v=CRJxOA5FZZE

@Component({
  selector: 'app-patient-card-list',
  templateUrl: './patient-card-list.component.html',
  styleUrls: ['./patient-card-list.component.css']
})
export class PatientCardListComponent implements AfterViewInit {
  @ViewChild('btn1', { static: false }) button: ElementRef;
  @ViewChild('input', { static: false }) input: ElementRef;
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

    this.patientsService.retrivePatients$("", null, null).subscribe(
      res => {
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

