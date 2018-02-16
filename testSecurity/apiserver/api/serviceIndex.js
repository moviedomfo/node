// RAML Swagger documentar REST

/** carga de módulos propios que gestionan cada ruta del api */
//const users = require('./users.js');


const jsonPlaceHolder = require('./jsonPlaceHolderService.js');
const sesiones = require('./sessions.js');
/** Función que configura las rutas de una aplicación */
module.exports = app => {
   // users(app, '/api/public/users');

    //patients(app, '/api/public/patients');
    //persons(app, '/api/public/persons');
    sesiones(app, '/api/pub/sessions');
    jsonPlaceHolder(app, '/api/placeHolders');
}