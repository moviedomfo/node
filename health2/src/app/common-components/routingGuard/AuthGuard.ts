import { Injectable } from '@angular/core';
import { Router, CanActivate ,CanDeactivate} from '@angular/router';
import { AuthenticationService } from '../../service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,  private authService: AuthenticationService,) { }

    canActivate() {

        if (this.authService.isAuth() === true) {
            
            return true;
         
        }
        
        this.authService.signOut();
        this.router.navigate(['/login']);

        
        
        return false;
    }
}

