

/** carga de módulos propios que gestionan cada ruta del api */
//const users = require('./users.js');


const jsonPlaceHolder = require('./jsonPlaceHolderService.js');
const sessions = require('./sessions.js');
const users = require('./users.js');
/** Función que configura las rutas de una aplicación */
module.exports = app => {
   // users(app, '/api/public/users');

    //patients(app, '/api/public/patients');
    users(app, '/api/pub/users');
    sessions(app, '/api/pub/sessions');
    jsonPlaceHolder(app, '/api/placeHolders');
}