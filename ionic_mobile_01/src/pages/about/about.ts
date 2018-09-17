import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Pagina2Page} from '../pagina2/pagina2';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }

  goPagina2():void{
    //this.navCtrl.push(Pagina2Page);
    this.navCtrl.push('p2');

    
  }

  saludo():void{
    alert('Hola esto es una primera prueba');
  }
}
