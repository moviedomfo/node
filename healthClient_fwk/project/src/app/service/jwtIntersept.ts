import { HttpRequest, HttpInterceptor, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentLogin, AppConstants } from '../model';
import { Injectable } from '@angular/core';

@Injectable()
export class JwtAuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

                
        //const idToken = localStorage.getItem("id_token");
        let currentLogin: CurrentLogin = JSON.parse(localStorage.getItem('currentLogin'));
        let idToken ;

        if(currentLogin  && currentLogin.oAuth)
        {
             idToken =  currentLogin.oAuth.access_token;
        }

        if (idToken) {
            
            //if the JWT is present, then we will clone the HTTP headers, 
            //and add an extra Authorization header, which will contain the JWT
            const cloned = req.clone({
                headers: req.headers.set("Authorization","Bearer " + idToken)
                                     .set('securityProviderName' , AppConstants.oaut_securityProviderName )
            });

            return next.handle(cloned);
        }
        else {
            //if the JWT is not present, then the request goes through to the server unmodified
            return next.handle(req);
        }
    }
}
      