/**
 * Permite que un usuario se registre
 * Es una inserción de un objeto en el recuros de usuarios
 */
// Usa la librería de seguridad
const seguridad = require('./../security/security.js')
const clc = require('cli-color');
//ruta = '/api/pub/users'
module.exports = (app, ruta) => {

 app.route(ruta)
    .post((req, res) => {
        // inserción de un registro de usuario
        let usuario = req.body;
        seguridad.existeUsuario(usuario)
            .then(result => {
                if (result.length > 0) {
                    console.log(`email ya registrado: ${usuario.email}`)
                    res.status(409).send(`email ${usuario.email} ya registrado`)
                }
                else {
                    console.log(`ok registrando: ${usuario.email}`)
                    seguridad.crearUsuario(usuario)
                        .then(() => {
                            let nuevoSessionId = seguridad.nuevaSesion(usuario);
                            res.status(201).json(nuevoSessionId);
                        });
                }
            });
    });

app.route(`${ruta}/metodosGet1`)
    .get((req, res) => {
       res.send('llamaste al metodo ' + `${ruta}/metodosGet1` );
    });
app.route(`${ruta}/metodosGet2`)
    .get(function (req, res) {
       res.send('llamaste al metodo ' + `${ruta}/metodosGet2` );
    });
    

    app.route(`${ruta}/list`)
        .get(function (req, res) {
              console.log(clc.bgRed("GET to" + `${ruta}/list`));
              
            
              seguridad.getAll()
                  .then(response => {
                      //let allUsers = JSON.stringify(response);
                    res.send(response);
                    // response.json().then(json => {
                    //     res.send(json);
                    // });
                  })
                  .catch(error => {
                    console.log(error);
                    res.send(error);
                  });
                  
            });
        

}