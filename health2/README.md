# AngularCrudNgcli

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.2.









## Themes 
    In this project we was used AdminLTE Dashboar https://adminlte.io/
## Theme for analisys gentelella 
    https://colorlib.com/polygon/gentelella/form_buttons.html
    Dispone de muy buenos formatos para forms

##Para descargas sin node_modules
1- run npm install
2- Reinstalar ng-grid https://www.ag-grid.com/angular-more-details/?framework=angular#gsc.tab=0
    npm install ag-grid
    npm install ag-grid-angular
3- Reinstalar Angular2 Bootstrap Modal Service
    npm install ng2-bootstrap-modal
4-npm install --save font-awesome

## Errors
Webpack: cannot resolve module 'file-loader'
                    npm install --save-dev file-loader
   No NgModule metadata found for 'AppModule'.             
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

5-Moment
npm install moment

**Global installs**

5- A JavaScript-Friendly .NET Based TypeScript Library
    git --> https://github.com/electricessence/TypeScript.NET/tree/master/tests/mocha/System
    install:
            `Universal Module Definition (UMD)`

                 npm install typescript-dotnet-umd

            It's highly recommended to use the UMD (minified) version for most cases since it works for AMD and CommonJS.
            Note: WebPack has trouble with UMD. Use CommonJS or AMD if you intend to use WebPack.

            `All Published NPM Module Types`

                    typescript-dotnet-umd
                    typescript-dotnet-es6
                    typescript-dotnet-commonjs
                    typescript-dotnet-amd
                    typescript-dotnet-system
            Install on only the module type you need in order to avoid type collisions.
            Currently it is possible/supported to use TypeScript .NET in a number of different ways:

            `Import Examples:`
                import Enumerable from "typescript-dotnet-es6/System.Linq/Linq"

