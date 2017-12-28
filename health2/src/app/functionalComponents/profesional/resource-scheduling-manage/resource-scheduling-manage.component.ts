import { Component, OnInit, ViewEncapsulation, Input ,Output,EventEmitter} from '@angular/core';
import { ResourceSchedulingBE, TimespamView } from "../../../model/profesional.model";
import { ServiceError, TimeSpan } from "../../../model/common.model";

@Component({
  selector: 'app-resource-scheduling-manage',
  templateUrl: './resource-scheduling-manage.component.html',
  
  encapsulation: ViewEncapsulation.None
})
export class ResourceSchedulingManageComponent implements OnInit {
  globalError: ServiceError;

  arrayOfTimes:TimespamView[];

  @Input()
  currentResourceScheduling:ResourceSchedulingBE;
  
  @Input()  
  isEditMode:boolean;
  @Output() OnResourceCreated = new EventEmitter<ResourceSchedulingBE>();
  @Output() OnComponentError = new EventEmitter<ServiceError>();


  private ArrayOfTimes : TimespamView[];
  constructor() { }

  ngOnInit() {
    var time_start:TimeSpan = new TimeSpan();
    var time_end:TimeSpan = new TimeSpan();
    time_start.Set_hhmmss('08:30');
    time_end.Set_hhmmss('18:30');

    if(!this.currentResourceScheduling){
      this.currentResourceScheduling = new ResourceSchedulingBE();

      this.currentResourceScheduling.TimeStart ='08:30';
      this.currentResourceScheduling.TimeEnd ='18:30';
    }

    this.arrayOfTimes = ResourceSchedulingBE.Get_ArrayOfTimes(new Date(), time_start,time_end,30,'health dates');
  }


  on_chkTodos(value:boolean){
      alert('on_chkTodos ' + value);
  }



}
