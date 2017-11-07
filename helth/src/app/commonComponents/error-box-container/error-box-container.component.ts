import { Component, OnInit, Input } from '@angular/core';
import { ServiceError } from 'app/model';

@Component({
  selector: 'app-error-box-container',
  templateUrl: './error-box-container.component.html',
  styleUrls: ['./error-box-container.component.css']
})
export class ErrorBoxContainerComponent implements OnInit {

  @Input()
  public globalError: ServiceError;
  @Input()
  public Dismissing : boolean;


  constructor() { }

  ngOnInit() {
  }

}
