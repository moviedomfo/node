import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { fwkDocument } from '../model';

@Injectable({
  providedIn: 'root'
})
export class FwkDocumentService {
  //represent the events emitted by the socket server which is consumed on the client as an Observable,
  newMessage = this.socket.fromEvent<fwkDocument>('message');
  messages = this.socket.fromEvent<string[]>('messages');

  constructor(private socket: Socket) { }

 

  sendDocument(document: Document) {
    this.socket.emit('editDoc', document);
  }


  
}