import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GooglePlaceComponent } from './commonComponents/google-place/google-place.component';
// google 
import { AgmCoreModule } from '@agm/core';
@NgModule({
  imports: [
    CommonModule,AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCOJEnZGUizUc5fQ5BzRDPifKxJuYPRgJA',
      libraries: ['places']
    })
  ],
  declarations: [GooglePlaceComponent]
})
export class BaseModule { }
