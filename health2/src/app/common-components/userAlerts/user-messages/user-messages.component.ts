import { Component, OnInit } from '@angular/core';
import { UserTask, UserMessage } from '../../../model';
import * as moment from 'moment';
import { Duration } from "moment";
@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html'

})
export class UserMessagesComponent implements OnInit {
  private  d=new Date();
  //public tasks:UserTask[];
  public messagesCount:number;

  
  //var travelTime = moment().add(2, 'hours').format('hh:mm A');
  public messages = [
    new UserMessage({messageId:0, tittle : "Realiza examen físico al paciente Moreno",  completedPercent : 50,body:'', createdDate:moment().subtract(33, 'minutes').toDate()}),
    new UserMessage({messageId:1, tittle : "Planifica el estudio del paciente y determina el tratamiento a seguir.",  completedPercent : 50,body:'', createdDate: moment().subtract(6, 'hours').toDate()}),
    new UserMessage({messageId:2, tittle : "Visitas domiciliarias hoy 13:30",  completedPercent : 50,body:'Visita a Alan Mcdonalls', createdDate: moment().subtract(30, 'seconds').toDate()}),
  ];
  constructor() { }

  ngOnInit() {

   
    let d=new Date();
    
    
    
    this.messages = [
      new UserMessage({messageId:0, tittle : "Realiza examen físico al paciente Moreno",  completedPercent : 50,body:'', createdDate:moment().subtract(33, 'minutes').toDate()}),
      new UserMessage({messageId:1, tittle : "Planifica el estudio del paciente y determina el tratamiento a seguir.",  completedPercent : 50,body:'', createdDate: moment().subtract(6, 'hours').toDate()}),
      new UserMessage({messageId:2, tittle : "Visitas domiciliarias hoy 13:30",  completedPercent : 50,body:'Visita a Alan Mcdonalls', createdDate: moment().subtract(30, 'seconds').toDate()}),
    ];
    this.messagesCount = this.messages.length;
 }

 onSelect(item){
   alert(item.Message);
 }
}
