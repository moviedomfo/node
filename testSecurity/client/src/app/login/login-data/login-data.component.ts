import { Component, OnInit } from '@angular/core';
import { LoginService } from "../login.service";
import { Router } from "@angular/router/src";
import { HttpHelpersService } from "../../service/http-helpers.service";
import { Session } from "../../model/user";


@Component({
  selector: 'app-login-data',
  templateUrl: './login-data.component.html'

})
export class LoginDataComponent implements OnInit {

  
  constructor(private httpService : HttpHelpersService) {}

  ngOnInit() {

  }


  checkSession ()
  {
    this.httpService.checkSession() .subscribe(
      result=>{
          alert (JSON.stringify(result));
      }, 
      e=>{
          this.httpService.handleError(e);
      });

  }
}
