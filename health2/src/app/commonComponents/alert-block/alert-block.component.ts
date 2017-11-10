import { Component, OnInit, Input } from '@angular/core';
import { EventType } from '../../model/index';

@Component({
  selector: 'app-alert-block',
  templateUrl: './alert-block.component.html',
  styleUrls: ['./alert-block.component.css']
})
export class AlertBlockComponent implements OnInit {

  
  dismissing: boolean; //si es false lo muestra como Additional content si es true como dismissing
  
  message: String;
  message2: String;
  
  alertClass: string; //alert-succes alert-info alert-warning

  display :boolean;
  tittle:string;
  constructor() { }

  ngOnInit() {

  }

  //eventType : EventType
  public Show(tittle :string ,message: string, message2:string ,dismissing: boolean, eventType: number) {
  
    this.tittle = tittle;
    this.message = message;
    this.message2 = message2;
    this.dismissing = dismissing;

    if (eventType === EventType.Success) {
      this.alertClass = 'alert alert-success';
    }
    if (eventType === EventType.Information) {
      this.alertClass = 'alert alert-info';
    }
    if (eventType === EventType.Error) {
      this.alertClass = 'alert alert-info';
    }
    if (eventType === EventType.Warning) {
      this.alertClass = 'alert alert-warning';
    }
    this.display = true;

  }

  public Hide(){
    this.display=false;
    this.dismissing = false; 
  }

}
