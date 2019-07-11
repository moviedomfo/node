import { Component,  ViewEncapsulation, Input ,Output,EventEmitter, AfterViewInit, ViewChild} from '@angular/core';
import { ResourceSchedulingBE, TimespamView } from "../../../model/profesional.model";
import { ServiceError, TimeSpan } from "../../../model/common.model";
import { AppConstants } from "../../../model/common.constants";
import { WeekDaysCheckEditComponent } from "../../../common-components/week-days-check-edit/week-days-check-edit.component";
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
  @Input() currentResourceScheduling:ResourceSchedulingBE;
  @Input() currentResourceSchedulingList:ResourceSchedulingBE[];
  @Input() isEditMode:boolean;
  @Output() OnResourceShedulingCreated = new EventEmitter<ResourceSchedulingBE>();
  @Output() OnComponentError = new EventEmitter<ServiceError>();
  @ViewChild('weekDaysCheckEdit',{ static: false }) weekDaysCheckEdit: WeekDaysCheckEditComponent;

  private ArrayOfTimes : TimespamView[];
  currentResourceScheduling_TimeStart:string;
  currentResourceScheduling_TimeEnd:string;
  constructor() {   
 }

  ngAfterViewInit() {
   
  }

  ngOnInit() {
    this.preinItialize();
  }
  
  on_cmbTimeChange(){
    //alert(JSON.stringify($event));
    this.currentResourceScheduling.TimeStart = this.currentResourceScheduling_TimeStart;
    this.currentResourceScheduling.TimeEnd = this.currentResourceScheduling_TimeEnd;
    this.currentResourceScheduling.Generate_Attributes_TimesPan();
    
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
      this.currentResourceScheduling.HealthInstitutionId = AppConstants.DefaultHealthInstitutionId;
    }

    if (this.isEditMode === true) {
      if (!this.currentResourceScheduling) {
        alert('Debe seleccionar una configuracion de turnos');
        return;
      }
    }
    this.weekDaysCheckEdit.Init();

    this.currentResourceScheduling_TimeStart = this.currentResourceScheduling.TimeStart;
    this.currentResourceScheduling_TimeEnd = this.currentResourceScheduling.TimeEnd;

    this.arrayOfTimes = ResourceSchedulingBE.Get_ArrayOfTimes(new Date(), time_start, time_end, 30, 'health dates');
  }


  onSubmit_resourceShedulingForm(isValid: boolean) {

    this.currentResourceScheduling.Generate_Attributes(false);
    //var resourceSchedulin_copy: ResourceSchedulingBE = Object.assign({}, this.currentResourceScheduling);
    var resourceSchedulin_copy = ResourceSchedulingBE.Map(this.currentResourceScheduling);

    if(this.currentResourceScheduling.WeekDays==0)
    {
      
        alert("Debe seleccionar algun dia de semana");
        return;
    }
    //alert(JSON.stringify(resourceSchedulin_copy));
    // console.log(JSON.stringify(this.currentResourceScheduling));
    // console.log(JSON.stringify(resourceSchedulin_copy));
    //alert(resourceSchedulin_copy.TimeStart_timesp.TotalMilliseconds + ' > ' + resourceSchedulin_copy.TimeEnd_timesp.TotalMilliseconds);
    if(resourceSchedulin_copy.TimeStart_timesp.TotalMilliseconds > resourceSchedulin_copy.TimeEnd_timesp.TotalMilliseconds)
    {
      alert("La hora de inicio debe ser anterior a la hora de finalización del turno");
      return;
    }
    //alert(this.ValidateIntersection(resourceSchedulin_copy));
    //console.log('llamada a ValidateIntersection')
    if(!this.ValidateIntersection(resourceSchedulin_copy))
    {
      //tittle  "Programación de turnos del profesional"
      alert("Esta programación de turnos se superpone con turnos existentes");
      return;
    }
   
    if (this.isEditMode == false && isValid)
    {   
      this.currentResourceSchedulingList.push(resourceSchedulin_copy);
      this.OnResourceShedulingCreated.emit(resourceSchedulin_copy) ;
    }
    this.preinItialize();
  }
  
  //Valida la overlaping de horarios
  //Si todo esta bien returna True
  ValidateIntersection(resourceSchedulin_copy: ResourceSchedulingBE):boolean {

    
    let isValid:boolean = true;
    this.currentResourceSchedulingList.forEach((item) => {
    
      //alert('ValidateIntersection forEach ' + item.WeekDays_BinArray);
      let item_clone = ResourceSchedulingBE.Map(item);
      //alert('item_clone.WeekDays_BinArray ' + item_clone.WeekDays_BinArray);
      item_clone.Generate_Attributes();
      //alert('item_clone.WeekDays_BinArray Generate_Attributes()' + item_clone.WeekDays_BinArray);

      //Si  hay dias en comun no hay problema se debe chequear interseccion de horarios
      if (item_clone.HasDaysInCommon(resourceSchedulin_copy.WeekDays_BinArray) == true) {

        resourceSchedulin_copy.Generate_Attributes();

        //Si tienen dias en comun hay que verificar que no se overlapen los horarios
        let intersection = ResourceSchedulingBE.intersection_totalMinutes(resourceSchedulin_copy, item_clone);
        if (intersection.length > 0)
          isValid = false;
      }

      
    });
    
    return isValid; //is valid
  }
}

