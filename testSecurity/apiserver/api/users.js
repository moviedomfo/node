/**
 * Permite que un usuario se registre
 * Es una inserción de un objeto en el recuros de usuarios
 */
// Usa la librería de seguridad
const seguridad = require('./../security/security.js')
const clc = require('cli-color');
//ruta = '/api/users'
module.exports = (app, ruta) => {

    app.route(`${ruta}/registry`).post((req, res) => {
            // inserción de un registro de usuario
            let usuario = req.body;
            seguridad.userExist(usuario)
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
                }), function (err) {
                    console.log(err);
                };
        });

    ///
    app.route(`${ruta}/checkSession`).post((req, res) => {

        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        //console.log(clc.yellow('checkSession token = ' + token));

        var result = seguridad.checkToken(app, req);
        return res.status(result.status).send(result);
        //res.send(JSON.stringify(result));


    });

    //ruta = '/api/users/authenticate'
    app.route(`${ruta}/authenticate`).post((req, res) => {

        let userToAuthenticate = req.body.user;
        
        console.log(clc.yellow('authenticate ' + userToAuthenticate.userName));
        
        seguridad.userExist_byname(userToAuthenticate.userName)
            .then(resultUser => {
                //console.log("usuario encontrado " +  JSON.stringify(resultUser));
                if (resultUser) {

                    if (resultUser.password != userToAuthenticate.password) {
                        res.send({ success: false, message: 'Authentication failed. Wrong password.' });
                    }
                    // si el usuario existe y la password esta ok creamos el token con el usuario como payload
                    var token = seguridad.newSession(app, resultUser);
                    var result = { user: resultUser, token: token };

                    res.send(JSON.stringify(result));
                }
                else {
                    res.json({ success: false, message: 'Authentication failed. User not found.' });
                }
            });

    });

    ///	http://localhost:8080/api/users/1555
    //app.route(`${ruta}/user:id`)
    app.route(`/api/users/user`)
        .get((req, res) => {
            var userName = req.query.Id;
            //console.log(clc.yellow('buscando ' + userName));
            seguridad.userExist_byname(userName)
                .then(result => {
                    if (result) {
                        console.log(`El usuario existe: ${result.email}`)
                        res.send(JSON.stringify(result));
                    }
                    else {
                        res.send('el usuario ' + req.query.Id + ' no existe ');
                    }
                });

        });
    //http://localhost:8080/api/users/get
    app.route(`${ruta}/get`)
        .get(function (req, res) {
            res.send('llamaste al metodo ' + `${ruta}/searchAll1`);
        });

 //http://localhost:8080/api/users/searchAll
    app.route(`${ruta}/searchAll`)
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