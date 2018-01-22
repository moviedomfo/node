import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GooglePlaceComponent } from './common-components/google-place/google-place.component';
// google 
import { AgmCoreModule } from '@agm/core';

import { FormsModule , ReactiveFormsModule} from '@angular/forms';

// import { AppsettingComponent } from './common-componets/layout/appsetting/appsetting.component';
// import { AppmenuComponent } from './common-componets/layout/appmenu/appmenu.component';
// import { AppfooterComponent } from './common-componets/layout/appfooter/appfooter.component';
// import { AppheaderComponent } from './common-componets/layout/appheader/appheader.component';
@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCOJEnZGUizUc5fQ5BzRDPifKxJuYPRgJA',
      libraries: ['places']
    })
  ],
  declarations: [GooglePlaceComponent]
})
export class BaseModule { }
