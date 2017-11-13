# AngularCrudNgcli

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



##Para descargas sin node_modules
1- run npm install
2- Reinstalar ng-grid https://www.ag-grid.com/angular-more-details/?framework=angular#gsc.tab=0
    npm install ag-grid
    npm install ag-grid-angular
3- Reinstalar Angular2 Bootstrap Modal Service
    npm install ng2-bootstrap-modal
4-npm install --save font-awesome

**Google Place API Angular 2**
http://brianflove.com/2016/10/18/angular-2-google-maps-places-autocomplete/

    npm install @agm/core
    Errores: error TS2304: Cannot find name 'google'
        solucion: instalar  @types/googlemaps 
        npm install @types/googlemaps --save --dev
        luego onde se uce google.maps ....
        poner  import { } from '@types/googlemaps';

4- Librerias UI PrimeNG (ultima instalada ^4.1.0) 
    npm install primeng --save
    **NOTA 2017/10/10** Esta lib no se instala correctamante : los modulos como cvalendar y otros no son reconocidos