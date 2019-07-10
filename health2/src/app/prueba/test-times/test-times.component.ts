import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PatientsService,CommonService } from '../../service/index';
import { PersonBE,PatientBE,IContextInformation, IParam, Param,TimespamView,TimeSpan } from '../../model/index';
import {TipoParametroEnum,DayNamesIndex_Value_ES} from '../../model/common.constants'
import * as moment from 'moment';
import { Duration } from "moment";
import { element } from 'protractor';
import { ResourceSchedulingBE } from "../../model/profesional.model";

@Component({
  selector: 'app-test-times',
  templateUrl: './test-times.component.html',
  styleUrls: ['./test-times.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TestTimesComponent implements OnInit {
  TimespamView:TimespamView;
  time_start:TimeSpan;
  time_end:TimeSpan;
  meses :string[];
  duration:Duration;
  duration2:Duration;

  arrayOftimes : TimespamView[];
  constructor() { }

  ngOnInit() {
    this.time_start = new TimeSpan();
    this.time_end = new TimeSpan();

    //moment.locale('pt-BR');

    this.meses = moment.months();

    this.duration = moment.duration(1440,'minutes');
    this.duration2 = moment.duration('3:30:59');
    //moment.duration(1440,'minutes').format("hh:ss");
    //alert(this.duration.asHours() );
    this.time_start.Set_hhmmss('08:30');
    this.time_end.Set_hhmmss('18:30');
 


    this.arrayOftimes = ResourceSchedulingBE.Get_ArrayOfTimes(new Date(), this.time_start,this.time_end,30,'health dates');
    
  }
  


  timeSpanParse2(hhmm:string) {
    //this.time_start.Parse(hhmm);
    
    
      let hhmmArray = hhmm.split(':');
          
      var day = new Date();
      var Fecha = new Date( day.getFullYear(),day.getMonth(),day.getDate(),Number.parseInt(hhmmArray[0]),Number.parseInt(hhmmArray[1]),0,0) ;

      var timespan = require('timespan');
   
      timespan.FromDates(Fecha);

      this.time_start.TotalMilliseconds = timespan.totalMilliseconds()


      
  
      
  }
  timeSpanParse(hhmmss:string) {
    this.time_start.Set_hhmmss(hhmmss);
    
    //alert(this.time_start.Milliseconds);
      
  }

}
