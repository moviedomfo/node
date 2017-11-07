import { Component, OnInit, Input } from '@angular/core';
import { EventType } from '../../model/index';

@Component({
  selector: 'app-alert-block',
  templateUrl: './alert-block.component.html',
  styleUrls: ['./alert-block.component.css']
})
export class AlertBlockComponent implements OnInit {

  @Input()
  dismissing: boolean; //si es false lo muestra como Additional content si es true como dismissing
  @Input()
  message: String;
  @Input()
  alertClass: string //alert-succes alert-info alert-warning

  constructor() { }

  ngOnInit() {

  }

  //eventType : EventType
  public Show(message: string, dismissing: boolean, eventType: number) {
    alert('dddddddddddddddddddd');
    this.message = message;
    this.dismissing = dismissing;
    if (eventType === EventType.Success) {
      this.alertClass = 'alert-success';
    }
    if (eventType === EventType.Information) {
      this.alertClass = 'alert-info';
    }
    if (eventType === EventType.Error) {
      this.alertClass = 'alert-info';
    }
    if (eventType === EventType.Warning) {
      this.alertClass = 'alert-warning';
    }
  }

}
