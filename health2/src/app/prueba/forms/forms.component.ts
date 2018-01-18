import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { PersonBE } from "../../model/persons.model";
import { ProfesionalBE } from "../../model/profesional.model";

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  encapsulation: ViewEncapsulation.None
})
export class FormsComponent implements OnInit {

  public profesional: ProfesionalBE;
  constructor() { }

  ngOnInit() {
    this.profesional = new ProfesionalBE();
    this.profesional.Persona = new PersonBE();
    this.profesional.Persona.Nombre = "Edwards";
    this.profesional.Persona.Apellido = "Newton";
    //this.profesional.Persona.Telefono1="0351-153390473";
    this.profesional.IdProfesion = 12;
    this.profesional.Matricula = '334412';
    this.profesional.IdProfesional = 1000000;
    this.profesional.NombreEspecialidad = 'Medico clinico';
  }
  onSubmit(profesional , valid) {
    
    if (valid) {
      alert("Se almaceno correctamente" + JSON.stringify(profesional));

    }
    else {
      alert("Verifique los errores");
    }
  }
}
