import { Component } from '@angular/core';
//import {DatepickerModuleoduler} from 'ngx-date-picker'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private firstDate:Date;dwqe
  constructor(){
    this.firstDate= new Date();
  }
  title = 'app';
}
