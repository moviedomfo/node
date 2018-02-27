/** Módulos de ayuda */
const jwt = require('jsonwebtoken');

var Promise = require('promise');
var Q = require("q");

const clc = require('cli-color');
/**
 * Módulo con funciones útiles para la seguridad de la aplicación
 */
module.exports = {
    /** determina si una ruta debe usar seguirdad o no */
    usarSeguridad: usarSeguridad,
    /** comprueba si exite un usuario */
    existeUsuario: existeUsuario,
    existeUsuario_byname,
    /** crea un nuevo usuario */
    crearUsuario: creandoUsuario,
    /** determina si unas credenciales son válidas */
    esUsuarioValido: esUsuarioValido,

    /** crea un nuevo token de sesión */
    //nuevaSesion: (usuario) => jwt.generaToken(usuario),
    newSession: newSession,
    getAll: getAll
}

function newSession(app, user) {
    console.log("Creando session token " + JSON.stringify(user.userName));
    var options = {
        expiresIn: 60
    };
    let secret = app.get('superSecret');

    var token = jwt.sign(user, secret, options);
    console.log("token is " + token);
    return token;
    //return jwt.generaToken(app,user);
}

function checkSecurity(app, ruta) {
    app.use(ruta, (req, res, next) => {
        // la validación de la sesión es en memoria
        // jwt descifra y valida un token
        var token = req.body.token || req.param('token') || req.headers['x-access-token'];
        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {			
                if (err) {
                    res.status(401).send({ success: false, message: 'Failed to authenticate token.' });
                    //res.json({ success: false, message: 'Failed to authenticate token.' });		
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;	
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({ 
                success: false, 
                message: 'No token provided.'
            });
            
        }

        // let sesion = verify(token,app);
        // if (sesion) {
        //     req.usuario = sesion.email;
        //     next();
        // } else {
        //     res.status(401).send('Invalid credential')
        // }
    })
}



function verify(token,app) {
    try {
        let secret = app.get('superSecret');
        return jwt.verify(token, secret)
    }
    catch(err){
        return false
    }
}

/**
 * los registros de usuario se crean físicamente en base de datos
 */

function existeUsuario(user) {
    //return mongodb.finding(colName, { email: usuario.email })

    return new Promise(function (resolve, reject) {

        var userInDatabase = users.find(x => x.userName === user.userName);

        resolve(userInDatabase);
    });
}
function existeUsuario_byname(userName) {



    return new Promise(function (resolve, reject) {
        var user = users.find(x => x.userName === userName);
        resolve(user);
    });
}
function getAll() {
    //return mongodb.finding(colName, { email: usuario.email })
    var dfd = Q.defer();
    return new Promise(function (resolve, reject) {

        resolve(users);
    });
}
function creandoUsuario(usuario) {
    //return mongodb.inserting(colName, usuario)
    return new Promise(function (resolve, reject) {
        var user = {
            'userName': usuario.userName,
            'password': usuario,
            'email': usuario.email
        };
        console.log('se creo el usuario ' + JSON.stringify(user));
        users.push(user);

        resolve(JSON.parse(user));
    });
}

function esUsuarioValido(usuario) {
    //return mongodb.finding(colName, { email: usuario.email, password: usuario.password })

    return new Promise(function (resolve, reject) {

        var user = users.find(x => x.userName === usuario.userName);
        //console.log(user);
        resolve(user);
    });
}

const users = [
    { userName: 'moviedo', password: '1234', email: 'moviedo@pelsoft.ar' },
    { userName: 'admin', password: '1234', email: 'admin@pelsoft.ar' },
    { userName: 'mrenaudo', password: '1234', email: 'mrenaudo@pelsoft.ar' },
];