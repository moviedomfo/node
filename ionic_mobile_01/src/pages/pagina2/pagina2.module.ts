import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Pagina2Page } from './pagina2';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    Pagina2Page,
  ],
  imports: [
    HttpClientModule,
    IonicPageModule.forChild(Pagina2Page),
  ],
})
export class Pagina2PageModule {}
