/**
 * Permite que un usuario haga login
 * Es una inserción de un objeto en el recuros de sesiones
 */
// Usa la librería de seguridad
const seguridad = require('./../security/security.js')
const clc = require('cli-color');
//ruta = '/api/pub/sessions'  y como es un post en el body vendria el user sesion
module.exports = (app, ruta) => {
    // Gestión de sesiones:  login
    console.log(clc.bgRed("Permite que un usuario haga login  "));
    
    app.route(ruta)
        .post((req, res) => {
            // inserción de un registro de sesión
          
            let sesion = req.body; 
            console.log(clc.red(JSON.stringify( sesion )));
            // seguridad.esUsuarioValido(sesion)
            //     .then(result => {
            //         if (result.length > 0) {
            //             console.log(`aceptado: ${sesion.email}`);
            //             let nuevoSessionId = seguridad.nuevaSesion(sesion);
            //             res.status(201).json(nuevoSessionId);
            //         } else {
            //             console.log(`Credencial inválida: ${sesion.email}`);
            //             res.status(401).send('Credencial inválida');
            //             res.send();
            //         }
            //     })
            //res.json( req.body.session);
            res.json( "TOdo okissss");

        });

}