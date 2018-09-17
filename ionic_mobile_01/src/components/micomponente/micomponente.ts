import { Component } from '@angular/core';

/**
 * Generated class for the MicomponenteComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'micomponente',
  templateUrl: 'micomponente.html'
})
export class MicomponenteComponent {

  text: string;

  constructor() {
    console.log('Hello MicomponenteComponent Component');
    this.text = 'Hello World';
  }

}
