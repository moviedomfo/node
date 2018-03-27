/**
 * Módulo de lógica intermedia.
 * @module middleware
 */

/**
 * @param {object} app - la aplicación de express
 * @param {object} express - el propio framework express
 * @return configura la aplicación
 */
module.exports.useMiddleware = app => {
    const cors = require('cors');
    const bodyParser = require('body-parser')
    const seguridad = require('./security/security.js')

 

    var config = require('./config.js'); 
    // Permite llamadas desde otros dominios o puertos
    app.use(cors());
    
    app.set('superSecret', config.SECRET); // secret variable
    
    // Permite recuperar como objetos JavaScript el contenido emitido por el cliente
    // tanto en parámetros
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    // como en el body
    app.use(bodyParser.json());

    // Otro uso común del middleware es la monitorización de la aplicación
    // Interceptor de llamadas
    app.use((req, res, next) =>{
        console.log(`recibida petición: ${req.url}`);
        // Es muy importante continuar el flujo hacia la siguiente función
        next();
        // En caso de no hacerlo, se colgaría la llamada
    });



      
    // este middleware se encargará de vigilar la entrada    
    seguridad.checkSecurity(app, '/api/priv/');
    seguridad.checkSecurity(app, '/api/placeHolders/priv/');
}