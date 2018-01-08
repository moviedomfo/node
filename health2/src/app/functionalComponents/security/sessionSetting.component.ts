import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

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
  encapsulation: ViewEncapsulation.None
})


export class SessionSettingComponent implements OnInit {

  public user: UserSession;

  constructor() { }

  ngOnInit() {
     this.user = new UserSession();
    
     this.user.username= '';
     this.user.email= '';
     this.user.password= '';
     this.user.confirmPassword= '';
    
  }

}

