import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, AppConstants, GetProfesionalRes, ProfesionalFullData } from '../../model/index'
import { AuthenticationService, ProfesionalService } from './../../service/index';
import { CurrentLogin, ServiceError, AuthenticationOAutResponse } from '../../model/common.model';
import { Observable, forkJoin } from 'rxjs';


@Component({
  templateUrl: 'login.component.html',
  moduleId: module.id

})

export class LoginComponent implements OnInit {
  public loading: boolean = false;
  public globalError: ServiceError;
  public currentLogin: CurrentLogin;
  public currentUser: User;
  public jwt_decode: any;
  public selectedDomain: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private prefesionalService: ProfesionalService) {

    // this.Serurity.storage_Institutions$().subscribe((res: Domain[]) => {
    //     this.domains = res;
    //     console.log('cargado domains');
    //   },
    //     err => {

    //       this.globalError = err;
    //     }
    //   );
  }

  ngOnInit() {
    // reset login status
    if (!this.currentUser)//if user is not {} or nullr is {} or null
    {
      this.currentUser = new User();
      this.currentUser.Roles = [];
    }
    if (!this.currentLogin)//if user is not {} or nullr is {} or null
    {
      this.currentLogin = new CurrentLogin();
      this.currentLogin.oAuth = new AuthenticationOAutResponse();
    }

    //this.retriveInstitutions();
  }

  authenticate() {

    this.globalError = null;
    // if(!this.currentUser.Domain)
    // {
    //   alert("Debe seleccionar un un dominio");
    //   return;
    // }
    this.loading = true;
    //this.currentUser.Domain = this.domains.find(p=> p.DomainId ==this.currentUser.DomainId).Domain;
    var authRes$: Observable<CurrentLogin> = this.authenticationService.oauthToken$(this.currentUser.UserName, this.currentUser.Password, '');

    authRes$.subscribe(
      res => {
        this.currentLogin = res;
        forkJoin(this.retriveProfesionalData(this.currentLogin.currentUser.UserId));
        //this.router.navigate(['/userReset']);
      },
      err => {
        //alert(err);
        //this.OnComponentError.emit(err);
        this.loading = false;
        this.globalError = err;
      }
    );

  }

  retriveProfesionalData(userGuid: string) {

    this.loading = true;
    //this.currentUser.Domain = this.domains.find(p=> p.DomainId ==this.currentUser.DomainId).Domain;
    var svc$: Observable<GetProfesionalRes> = this.prefesionalService.getProfesionalService$(false, false, null, userGuid, AppConstants.DefaultHealthInstitutionId, true, null);

    svc$.subscribe(
      res => {

        let currentProfesionalData: ProfesionalFullData = new ProfesionalFullData;

        currentProfesionalData.Profesional = res.Profesional;

        currentProfesionalData.HealthInstitution_ProfesionalBE = res.HealthInstitution_ProfesionalBE;
        currentProfesionalData.HealthInstitution_ProfesionalList = res.HealthInstitution_ProfesionalList;
        //console.log(JSON.stringify(res));
        localStorage.setItem('currentProfesionalData', JSON.stringify(currentProfesionalData));

        this.loading = false;
        this.prefesionalService.currentProfesionalChange_subject$.next(currentProfesionalData);

        this.router.navigate(['']);
      },
      err => {

        //this.OnComponentError.emit(err);
        this.loading = false;
        this.globalError = err;
      }
    );

  }
}
