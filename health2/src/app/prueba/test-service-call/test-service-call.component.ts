import { Component, OnInit } from '@angular/core';
import { PatientsService, TestService, AuthenticationService } from '../../service';
import { PatientBE, ServiceError, AuthenticationOAutResponse } from '../../model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test-service-call',
  templateUrl: './test-service-call.component.html'
  
})
export class TestServiceCallComponent implements OnInit {
  globalError: ServiceError;
  executeResult$: Observable<string>;
  patientList$: Observable<PatientBE[]>;
  patientList: PatientBE[];
  currentPatient: PatientBE;
  currentPatient$: Observable<PatientBE>;


  result_tittle:string;
result_message:string;
  constructor(private authenticationService:AuthenticationService,private patientService: PatientsService,private testService :TestService) { }

  ngOnInit() {
  }

  
  btnExecute_test_execute(){
    
    //this.executeResult$ = this.testService.execute();
    this.executeResult$.subscribe(
      res => {
        this.result_tittle = "llamada a execute";
        this.result_message = JSON.stringify(res);
        
      },
      err => {

        this.globalError = err;
      }
    );

  }
  
  btnRefreshOAuth(){
    var authResult$:Observable<AuthenticationOAutResponse> = this.authenticationService.refreshoauthToken();
    authResult$.subscribe(
      res => {
        this.result_tittle = "llamada a Refresh authenticationService.oauthToke";
        this.result_message = JSON.stringify(res);
        

      },
      err => {

        this.globalError = err;
      }
    );
  }
  btnOAuth(){
    var authResult$:Observable<AuthenticationOAutResponse> = this.authenticationService.oauthToken('moviedo','Lince21+');
    authResult$.subscribe(
      res => {
        this.result_tittle = "llamada a authenticationService.oauthToke";
        this.result_message = JSON.stringify(res);
        

      },
      err => {

        this.globalError = err;
      }
    );
  }
  btnExecute_POST(){
    
    this.patientList$ = this.patientService.retrivePatientsSimple_post$();
    this.patientList$.subscribe(
      res => {

        this.patientList = res;

      },
      err => {

        this.globalError = err;
      }
    );

  }


  btnExecute_GET(){
    
    this.currentPatient$ = this.patientService.getPatientById(123);
    this.currentPatient$.subscribe(
      res => {

        this.currentPatient = res;

      },
      err => {

        this.globalError = err;
      }
    );

  }
}
