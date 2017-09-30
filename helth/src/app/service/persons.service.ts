import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import {PersonBE} from '../../app/model/persons.model'

@Injectable()
export class PersonsService {

  constructor() { }
  getPersons() { return Observable.of(PersonaList); }

  getPerson(id: number | string) {
    return this.getPersons()
      // (+) before `id` turns the string into a number
      .map(persona => PersonaList.find(p => p.IdPersona === +id));
  }
}

const PersonaList = [
  new PersonBE(11, 'Mr. Nice'),
  new PersonBE(12, 'Narco'),
  new PersonBE(13, 'Bombasto'),
  new PersonBE(14, 'Celeritas'),
  new PersonBE(15, 'Magneta'),
  new PersonBE(16, 'RubberMan')
];
