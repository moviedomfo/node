import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Rol, ServiceError, User, AuthenticationOAutResponse } from 'src/app/model';
import { SerurityService } from 'src/app/service/serurity.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loging',
  templateUrl: './loging.component.html',
  styleUrls: ['./loging.component.css']
})
export class LogingComponent implements OnInit {
    globalError: ServiceError;
   public currentUser: User;
 
   //@Output() OnComponentError = new EventEmitter<ServiceError>();
   //allRoles :Rol[]=[];
   
  constructor(private Serurity: SerurityService ) { }

  ngOnInit() {

    if(!this.currentUser)//if user is not {} or nullr is {} or null
    {
       this.currentUser= new User();
       this.currentUser.Roles=[];
    }

  }

  authenticate(){

    var authRes$ :Observable<AuthenticationOAutResponse>= this.Serurity.loging$(this.currentUser.UserName,this.currentUser.Password);

    authRes$.subscribe(
      res => {
        console.log(JSON.stringify(res));
       
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
