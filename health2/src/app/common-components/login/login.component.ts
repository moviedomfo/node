import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../../model/index'
import { AuthenticationService } from './../../service/index';
import { CurrentLogin } from '../../model/common.model';

@Component({
    templateUrl: 'login.component.html',
    moduleId: module.id
    
})

export class LoginComponent implements OnInit {
    currentUser: User = new User();
 
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {

        this.authenticationService.oauthToken_owin$(this.currentUser.UserName, this.currentUser.Password)
        .subscribe(res=>{


        });
        this.loading = true;
        this.authenticationService.login(this.currentUser.UserName, this.currentUser.Password)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/']);
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }
}
