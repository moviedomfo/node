import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapsService } from './service/maps.service';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

   lat: string ='';
   lng: string ='';
   constructor(private map:MapsService){}

   ngOnInit(){

    this.map.getLocation().subscribe(data=>{
  
    });

   }
 }
