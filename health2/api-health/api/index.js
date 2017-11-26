// RAML Swagger documentar REST

/** carga de módulos propios que gestionan cada ruta del api */
const users = require('./users.js');
const patints = require('./patients.js');
const persons = require('./persons.js');
const appoiments = require('./appoiments.js');

/** Función que configura las rutas de una aplicación */
module.exports = app => {
    users(app, '/api/public/users');

    patients(app, '/api/public/patients');
    persons(app, '/api/public/persons');
    appoiments(app, '/api/priv/appoiments');
}