import { Component, OnInit, ViewEncapsulation, Input ,Output,EventEmitter, AfterViewInit, ViewChild} from '@angular/core';
import { ResourceSchedulingBE, TimespamView } from "../../../model/profesional.model";
import { ServiceError, TimeSpan } from "../../../model/common.model";
import { HealtConstants } from "../../../model/common.constants";
import { WeekDaysCheckEditComponent } from "../../../commonComponents/week-days-check-edit/week-days-check-edit.component";
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-resource-scheduling-manage',
  templateUrl: './resource-scheduling-manage.component.html',
  
  encapsulation: ViewEncapsulation.None,
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})

//allows create and edit ResourceSchedulingBE. this component contains weekDaysCheckEdit
export class ResourceSchedulingManageComponent implements AfterViewInit {
  globalError: ServiceError;
  arrayOfTimes:TimespamView[];
  @Input()
  currentResourceScheduling:ResourceSchedulingBE;
 
  @Input()  
  isEditMode:boolean;
  @Output()
   OnResourceShedulingCreated = new EventEmitter<ResourceSchedulingBE>();
  @Output() OnComponentError = new EventEmitter<ServiceError>();
  @ViewChild('weekDaysCheckEdit') weekDaysCheckEdit: WeekDaysCheckEditComponent;

  private ArrayOfTimes : TimespamView[];
  constructor() { 
   
 }

  ngAfterViewInit() {
   
  }
  ngOnInit() {
    this.preinItialize();
  }


  on_chkTodos(value:boolean){
      alert('on_chkTodos ' + value);
  }

  public preinItialize()
  {
 
    
    var time_start: TimeSpan = new TimeSpan();
    var time_end: TimeSpan = new TimeSpan();
    time_start.Set_hhmmss('08:30');
    time_end.Set_hhmmss('18:30');
    //alert(this.isEditMode)
    
    if (this.isEditMode === false) {
      this.currentResourceScheduling = new ResourceSchedulingBE();

      this.currentResourceScheduling.WeekDays = 0;
      this.currentResourceScheduling.DateStart = null;
      this.currentResourceScheduling.DateEnd = null;
      this.currentResourceScheduling.Duration = 30;
      this.currentResourceScheduling.Description = '';
      this.currentResourceScheduling.TimeStart = '08:30';
      this.currentResourceScheduling.TimeEnd = '18:30';
      this.currentResourceScheduling.TimeStart_timesp = TimeSpan.FromHHMM('08:30');
      this.currentResourceScheduling.TimeEnd_timesp = TimeSpan.FromHHMM('08:30');
      this.currentResourceScheduling.HealthInstitutionId = HealtConstants.DefaultHealthInstitutionId;
    }

    if (this.isEditMode == true) {
      if (!this.currentResourceScheduling) {
        alert('Debe seleccionar una configuracion de turnos');
        return;
      }
    }
    this.weekDaysCheckEdit.Init();


    this.arrayOfTimes = ResourceSchedulingBE.Get_ArrayOfTimes(new Date(), time_start, time_end, 30, 'health dates');
  }


  onSubmit_resourceShedulingForm(isValid: boolean) {

    this.currentResourceScheduling.Generate_Attributes();
    var resourceSchedulin_copy: ResourceSchedulingBE = Object.assign({}, this.currentResourceScheduling);
   // resourceSchedulin_copy.Generate_Attributes();
    if (this.isEditMode == false && isValid)
    {   
      
      this.OnResourceShedulingCreated.emit(resourceSchedulin_copy) ;

    }
    this.preinItialize();
  }
}

