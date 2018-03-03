import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';import { HttpHelpersService } from "../service/http-helpers.service";
;

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: HttpHelpersService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      //Este codigo se agrega a  lo que genera ng g guard auth/auth --no-spec
      if (!this.authService.authenticated) {
        //si no esta autenticado lo envia al default : donde le dira que se loguee
        this.router.navigate(['/']);
        return false;
      }


    return true;
  }
}
