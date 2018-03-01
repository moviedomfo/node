import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { HttpHelpersService } from "./service/http-helpers.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  //We imported the AuthService and made it publicly available in our constructor
  //constructor(public authService: AuthService) {}
  constructor(public authService: HttpHelpersService) {}
}
