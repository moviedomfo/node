import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Rol, ServiceError, User, AuthenticationOAutResponse, CurrentLogin } from 'src/app/model';
import { SerurityService } from 'src/app/service/serurity.service';
import { Observable } from 'rxjs';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-loging',
  templateUrl: './loging.component.html',
  styleUrls: ['./loging.component.css']
})
export class LogingComponent implements OnInit {
    globalError: ServiceError;
   public currentLogin: CurrentLogin;
   public currentUser: User;
 public jwt_decode :any;
   //@Output() OnComponentError = new EventEmitter<ServiceError>();
   //allRoles :Rol[]=[];
   
  constructor(private Serurity: SerurityService ) { }

  ngOnInit() {

    if(!this.currentUser)//if user is not {} or nullr is {} or null
    {
       this.currentUser= new User();
       this.currentUser.Roles=[];
    }
    if(!this.currentLogin)//if user is not {} or nullr is {} or null
    {
       this.currentLogin= new CurrentLogin();
       this.currentLogin.oAuth = new  AuthenticationOAutResponse();
    }
    
  }

  authenticate(){

    var authRes$ :Observable<CurrentLogin>= this.Serurity.loging$(this.currentUser.UserName,this.currentUser.Password);

    authRes$.subscribe(
      res => {
        //console.log(JSON.stringify(res));
     
        this.currentLogin = JSON.parse(localStorage.getItem('currentLogin'));
        let tokenInfo = jwt_decode(this.currentLogin.oAuth.access_token); // decode token
        //alert(tokenInfo.exp);
        this.jwt_decode = tokenInfo;
        // alert(JSON.stringify(this.currentLogin.username));
        // alert(JSON.stringify(this.currentLogin.oAuth));
       },
      err => {
        //this.OnComponentError.emit(err);
      }
    );
    
  }

}

class UserSession
{
  userName: string;
 email: string;
 password: string;
 confirmPassword: string;
}
