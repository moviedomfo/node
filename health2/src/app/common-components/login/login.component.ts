import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../../model/index'
import { AuthenticationService } from './../../service/index';
import { CurrentLogin, ServiceError, AuthenticationOAutResponse } from '../../model/common.model';
import { Observable } from 'rxjs';

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
        private authenticationService: AuthenticationService) { 

            // this.Serurity.storage_Domains$().subscribe((res: Domain[]) => {
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
    
    //this.authenticationService.checkDomains();
    }
    authenticate() {
    
 
        // if(!this.currentUser.Domain)
        // {
        //   alert("Debe seleccionar un un dominio");
        //   return;
        // }
        this.loading = true;
        //this.currentUser.Domain = this.domains.find(p=> p.DomainId ==this.currentUser.DomainId).Domain;
        var authRes$: Observable<CurrentLogin> = this.authenticationService.oauthToken$(this.currentUser.UserName, this.currentUser.Password,'');
    
        authRes$.subscribe(
          res => {
            //console.log(JSON.stringify(res));
    
            this.currentLogin = res;
            this.loading = false;
            this.router.navigate(['/userReset']);
          },
          err => {
    
            //this.OnComponentError.emit(err);
            this.loading = false;
            this.globalError = err;
          }
        );
    
      }

}
