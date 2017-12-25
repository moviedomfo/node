import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PatientsService,CommonService } from '../../service/index';
import { PersonBE,PatientBE,IContextInformation, IParam, Param,TimespamView,TimeSpan } from '../../model/index';
import {TipoParametroEnum,DayNamesIndex_Value_ES} from '../../model/common.constants'
import * as moment from 'moment';
import { Duration } from "moment";

@Component({
  selector: 'app-test-times',
  templateUrl: './test-times.component.html',
  styleUrls: ['./test-times.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TestTimesComponent implements OnInit {
  TimespamView:TimespamView;
  time_start:TimeSpan;
  meses :string[];
  duration:Duration;
  duration2:Duration;
  constructor() { }

  ngOnInit() {
    this.time_start = new TimeSpan();
    this.TimespamView = new TimespamView();

    moment.locale('pt-BR');

    this.meses = moment.months();

    this.duration = moment.duration(1440,'minutes');
    this.duration2 = moment.duration('3:30:59');
    //moment.duration(1440,'minutes').format("hh:ss");
    //alert(this.duration.asHours() );
    
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
  timeSpanParse(hhmm:string) {
    this.time_start.Set_hhmmss(hhmm);
    alert(this.time_start.Milliseconds);
      
  }

}
