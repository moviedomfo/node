import { Component, OnInit, ViewEncapsulation, Input ,Output,EventEmitter} from '@angular/core';
import { ResourceSchedulingBE } from "../../../model/profesional.model";
import { ServiceError } from "../../../model/common.model";

@Component({
  selector: 'app-resource-scheduling-manage',
  templateUrl: './resource-scheduling-manage.component.html',
  
  encapsulation: ViewEncapsulation.None
})
export class ResourceSchedulingManageComponent implements OnInit {
  globalError: ServiceError;
  @Input()
  currentResourceScheduling:ResourceSchedulingBE;
  
  @Input()  
  isEditMode:boolean;
  @Output() OnResourceCreated = new EventEmitter<ResourceSchedulingBE>();
  @Output() OnComponentError = new EventEmitter<ServiceError>();
  constructor() { }

  ngOnInit() {

    if(!this.currentResourceScheduling){
      this.currentResourceScheduling = new ResourceSchedulingBE();
    }
  }


  on_chkTodos(value:boolean){
      alert('on_chkTodos ' + value);
  }



}
