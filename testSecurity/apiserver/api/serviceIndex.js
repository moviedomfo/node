

/** carga de módulos propios que gestionan cada ruta del api */
//const users = require('./users.js');


const jsonPlaceHolder = require('./jsonPlaceHolderService.js');

const users = require('./users.js');
const common = require('./common.js');
/** Función que configura las rutas de una aplicación */
module.exports = app => {
   // users(app, '/api/public/users');
    common(app, '/');
    //patients(app, '/api/public/patients');
    users(app, '/api/users');

    jsonPlaceHolder(app, '/api/placeHolders');


}