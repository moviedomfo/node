import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import {User} from '../../model/index'
import { AuthService } from './../auth/auth.service';
import { LoginService } from "./login.service";
import { User } from "../model/user";

@Component({
    templateUrl: 'login.component.html',
    moduleId: module.id
    
})

export class LoginComponent implements OnInit {
    //currentUser: User = new User();
    loading = false;
    error = '';
    user:User;//:any = { email:'', password:''}
    mensaje = "";
    constructor(
        private router: Router,
        private authenticationService: AuthService,
        private loginService:LoginService) { }

    ngOnInit() {
        // reset login status
        //this.authenticationService.logout();

        this.user=new  User();
    }

    login() {
        console.log('Enviando credenciales para entrada: ' + JSON.stringify(this.user));
        this.mensaje="validando...";
        this.loginService.logIn(this.user)
            .subscribe(
                result=>{
                    console.log(result);
                }, 
                e=>{
                    this.mostrarError(e);
                });
        // this.authenticationService.login(this.currentUser.UserName, this.currentUser.Password)
        //     .subscribe(result => {
        //         if (result === true) {
        //             this.router.navigate(['/']);
        //         } else {
        //             this.error = 'Username or password is incorrect';
        //             this.loading = false;
        //         }
        //     });

       
    }
    registry(){
        console.log('Enviando credenciales para registrar: ' + JSON.stringify(this.user));
        this.mensaje="validando...";
        this.loginService
            .registry(this.user)
            .subscribe(
                result=>{
                    console.log(result);
                }, 
                e=>{
                    this.mostrarError(e);
                })
    }

    mostrarError(e){
        this.mensaje="ERROR";
        console.error(e);
    }

}
