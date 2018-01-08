import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { User, ServiceError } from "../../model/common.model";
import { AuthenticationService } from "../../service/authentication.service";

class UserSession
{
 username: string;
 email: string;
 password: string;
 confirmPassword: string;
}

@Component({
  selector: 'app-session-setting',
  templateUrl: './sessionSetting.component.html',
  encapsulation: ViewEncapsulation.None,
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})


export class SessionSettingComponent implements OnInit {

   
  globalError: ServiceError;
  @Input()  
  public currentUser: User;
   user: UserSession;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
     this.user = new UserSession();
    
     if(this.currentUser)//if user is {} or null
     {
     
     this.user.username= this.currentUser.Username;
     this.user.email= this.currentUser.Email;
     this.user.password= '';
     this.user.confirmPassword= '';
     }
     else
     {  
       
      this.user= new UserSession();
     }
  }
  btnCheckUserName_Click(){
    //this.authenticationService.
    //bool exist = Fwk.UI.Controller.SecurityController.ValidateUserExist(txtUsername.Text.Trim());
    //El nombre de usuario ya se encuentra registrado \r\n por favor elija otro
    //Nombre de usuario disponible
  }
}

