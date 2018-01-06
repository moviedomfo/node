import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { Duration } from "moment";
import { ResourceSchedulingBE, TimespamView } from "../../../model/profesional.model";


@Component({
  selector: 'app-intersections',
  templateUrl: './intersections.component.html',

  encapsulation: ViewEncapsulation.None
})
export class IntersectionsComponent implements OnInit {

  //intersetResult:boolean;
  resource1: ResourceSchedulingBE;
  resource2: ResourceSchedulingBE;
  intersetResult: TimespamView[];
  intersetResultTotalSecond:number[];
  range1: TimespamView[];
  range2: TimespamView[];
  constructor() { }

  ngOnInit() {
    this.range1 = []; this.range2 = [];
    this.resource1 = new ResourceSchedulingBE();
    this.resource1.Description = 'Sheduling 1';
    this.resource1.Duration = 30;
    this.resource1.TimeStart = "9:00";
    this.resource1.TimeEnd = "15:00";
    // this.resource1.Generate_Attributes();

    this.resource2 = new ResourceSchedulingBE();
    this.resource2.Description = 'Sheduling 2';
    this.resource2.Duration = 30;
    this.resource2.TimeStart = "13:30";
    this.resource2.TimeEnd = "16:00";
    // this.resource2.Generate_Attributes();

  }
  btnInterset() {
    
    this.resource2.Generate_Attributes();
    this.resource1.Generate_Attributes();
    this.range1 = this.resource1.Get_ArrayOfTimes(new Date());
    this.range2 = this.resource2.Get_ArrayOfTimes(new Date());

    this.intersetResultTotalSecond  = ResourceSchedulingBE.intersection_totalMinutes(this.resource1,this.resource2);
    if(this.intersetResultTotalSecond .length>0)
    {
      alert('Si hay coincidencias');
    }
    else{
      alert('No hay coincidencias');
    }
    //var rangoTotalSecond1 = this.resource1.Get_ArrayOfTimes_TotalMinutes();
    //var rangoTotalSecond2 = this.resource2.Get_ArrayOfTimes_TotalMinutes();

    //this.intersetResult = this.range1.filter(item => this.range2.includes(item));

    //this.intersetResultTotalSecond = rangoTotalSecond1.filter(item => rangoTotalSecond2.includes(item));
  }
}