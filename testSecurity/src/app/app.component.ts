import { Component } from '@angular/core';
import { HttpHelpersService } from "./service/http-helpers.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  //We imported the HttpHelpersService and made it publicly available in our constructor
  constructor(public authService: HttpHelpersService) {}
}
