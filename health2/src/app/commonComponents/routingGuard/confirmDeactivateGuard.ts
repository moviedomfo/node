//import { CanDeactivateComponent } from './app/can-deactivate';
import { Injectable } from '@angular/core';
import { Observable }    from 'rxjs/Observable';
import { Router, CanActivate ,CanDeactivate} from '@angular/router';
export interface CanDeactivateComponent {
  
  hasChanges: () => Observable<boolean> | Promise<boolean> | boolean;

 }
 
 export class ConfirmDeactivateGuard implements CanDeactivate<CanDeactivateComponent> {

   canDeactivate(target: CanDeactivateComponent) {
     if(target.hasChanges()){
         return window.confirm('Realmente quiere salir de esta página?');
     }
     return true;
   }
 }