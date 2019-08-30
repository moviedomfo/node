import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserTask } from '../../../model';
import * as moment from 'moment';
import { Duration } from "moment";
@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class UserTasksComponent implements OnInit {
  private  d=new Date();
  //public tasks:UserTask[];
  public taskCount:number;
  
  
  tasks = [
    new UserTask({taskId:0, tittle : "Realiza examen físico al paciente Moreno",  completedPercent : 50,descripcion:'', createdDate: this.d,priority : "low"}),
    new UserTask({taskId:1, tittle : "Planifica el estudio del paciente y determina el tratamiento a seguir.",  completedPercent : 50,descripcion:'', createdDate: this.d,priority : "medium"}),
    new UserTask({taskId:2, tittle : "Visitas domiciliarias hoy 13:30",  completedPercent : 50,descripcion:'Visita a Alan Mcdonalls', createdDate: this.d,priority : "hight"}),
  ];
  constructor() { }

  ngOnInit() {

   
    let d=new Date();

    this.tasks = [
      new UserTask({taskId:0, tittle : "Realiza examen físico al paciente Moreno",  completedPercent : 50,descripcion:'', createdDate: d,priority : "low"}),
      new UserTask({taskId:1, tittle : "Planifica el estudio del paciente y determina el tratamiento a seguir.",  completedPercent : 50,descripcion:'', createdDate: d,priority : "medium"}),
      new UserTask({taskId:2, tittle : "Visitas domiciliarias hoy 13:30",  completedPercent : 50,descripcion:'Visita a Alan Mcdonalls', createdDate: d,priority : "hight"}),
    ];

    this.taskCount = this.tasks.length;
 }

 
 onSelect(item){
  alert(item.tittle);
}
}
