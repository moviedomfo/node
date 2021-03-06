import { Component, OnInit, Input } from '@angular/core';
import { ServiceError } from '../../model';

@Component({
  selector: 'app-error-box-container',
  templateUrl: './error-box-container.component.html',
  styleUrls: ['./error-box-container.component.css']
})
export class ErrorBoxContainerComponent implements OnInit {

  @Input()
  public globalError: ServiceError;



  constructor() { }

  ngOnInit() {
  }

}
