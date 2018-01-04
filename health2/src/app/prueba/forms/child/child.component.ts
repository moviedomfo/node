import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { PersonBE } from "../../../model/persons.model";

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',

  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
  encapsulation: ViewEncapsulation.None
})
export class ChildComponent implements OnInit {

  @Input()
  public person : PersonBE;
  constructor() { }

  ngOnInit() {
  }

}
