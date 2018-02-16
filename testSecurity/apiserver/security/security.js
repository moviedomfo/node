/** Módulos de ayuda */

const jwt = require('./jwt');
var Promise = require('promise');
var Q = require("q");
const colName = 'usuarios';
/**
 * Módulo con funciones útiles para la seguridad de la aplicación
 */
module.exports = {
    /** determina si una ruta debe usar seguirdad o no */
    usarSeguridad: usarSeguridad,
    /** comprueba si exite un usuario */
    existeUsuario: existeUsuario,
    /** crea un nuevo usuario */
    crearUsuario: creandoUsuario,
    /** determina si unas credenciales son válidas */
    esUsuarioValido: esUsuarioValido,
    /** crea un nuevo token de sesión */
    nuevaSesion: (usuario) => jwt.generaToken(usuario),
    getAll : getAll
}

function usarSeguridad(app, ruta) {
    app.use(ruta, (req, res, next) => {
        // la validación de la sesión es en memoria
        // jwt descifra y valida un token
        let sessionId = req.get('sessionId')
        let sesion = jwt.verify(sessionId)
        if (sesion) {
            req.usuario = sesion.email
            next()
        } else {
            res.status(401).send('Credencial inválida')
        }
    })
}

/**
 * los registros de usuario se crean físicamente en base de datos
 */

function existeUsuario(usuario) {
    //return mongodb.finding(colName, { email: usuario.email })
    var dfd = Q.defer();
    return new Promise(function (resolve, reject) {
        
        var user = users.find(x => x.userName === usuario.userName);
       
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
        var user ={
            'userName': usuario.userName,
            'password': usuario,
            'email': usuario.email
        };
        console.log('se creo el usuario ' + JSON.stringify(user));
        users.push(user);
       
        resolve(user);
    });
}

function esUsuarioValido(usuario) {
    //return mongodb.finding(colName, { email: usuario.email, password: usuario.password })
    var dfd = Q.defer();
    return new Promise(function (resolve, reject) {
       
        var user = users.find(x => x.userName === usuario.userName);
       console.log(user);
        resolve(user);
    });
}

const users = [
    { userName: 'moviedo', password: '1234', email: 'moviedo@pelsoft.ar' },
    { userName: 'admin', password: '1234', email: 'admin@pelsoft.ar' },
    { userName: 'mrenaudo', password: '1234', email: 'mrenaudo@pelsoft.ar' },
];