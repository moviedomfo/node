# Project
#en express
        npm i express socket.io @types/socket.io --save

## angular
    npm i ngx-socket-io --save 

## material

Alternative 1:
  npm install --save @angular/material @angular/cdk @angular/animations

Alternative 2: Angular Devkit 6+
    ng add @angular/material




This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.5.

##  @angular/material generating components



Create a card-based dashboard component
@angular/material:materialDashboard

Create a component that displays data with a data-table
@angular/material:materialTable

Create a component with a responsive sidenav for navigation
    @angular/material:materialNav

ng generate @angular/material:materialNav --name myNav
ng generate @angular/material:material-nav -name =main-nav
ng generate @angular/material:materialDashboard --name myDashboard
ng generate @angular/material:materialTable -- name myTable

## Installing Bootstrap 4 https://www.youtube.com/watch?v=yjQsFVzujck&t=69s
    npm install bootstrap jquery popper
    
   
   To enable bootstrap 4 theme templates in ngx-bootstrap, please read here
   <!-- index.html En este caso no se hizo esto-->

 

   ##Para que funcione accordion collapsed de bootstrap 4

   **Mirar si trenemos  package.json

    {
        "bootstrap": "^4.1.3",
        "popper.js": "^1.14.3",
        "jquery": "3.3.1"
        }

   Y en 
Luego instalar:angular.json !!CUIDADO DE NO AGREGARLO SOLO A "test": {..}!!
       "styles": [
              "./node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css",
              "src/styles.css",
              "./node_modules/bootstrap/dist/css/bootstrap.min.css"

            ],
            "scripts": [
              "./node_modules/jquery/dist/jquery.min.js",
              "./node_modules/popper.js/dist/umd/popper.js",
              "./node_modules/bootstrap/dist/js/bootstrap.min.js"
            ],
## popper
   npm install --save popper.js

##  ngx-spinner
npm install ngx-spinner --save

# Paginacion con tabla
npm install ngx-pagination --save
   ref
    https://www.youtube.com/watch?v=NUmLaVcx1HI
    https://github.com/bezael/loopback3_angular6_bootstrap4/blob/master/apiBooks/client/src/app/app.module.ts

# hammerjs
npm install --save hammerjs

Problemas google maps

Al pasar a angular 7  y reinstalar los modulos de google
npm install @types/googlemaps --save-dev


problema 1
  npm WARN @agm/core@1.0.0-beta.5 requires a peer of @angular/common@^5.0.0 || ^6.0.0 but none is installed. You must install peer dependencies yourself.
  npm WARN @agm/core@1.0.0-beta.5 requires a peer of @angular/core@^5.0.0 || ^6.0.0 but none is installed. You must install peer dependencies yourself

Solucion 
 en package.json  actualice a  "@agm/core": "^1.0.0-beta.6",
  y corri nmp install

problema 2 Typescript Error Cannot find name ‘google’
 Solucion   agreagar al modulo que usa google esta declaracion -->app-autocomplete-google

    declare var google;
problem 3 en el cliente f12
    Uncaught Error: Template parse errors: 'AutocompleteComponent' is not a known element:    



    

