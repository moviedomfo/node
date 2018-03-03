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
  checkSecurity: checkSecurity,
  checkToken: checkToken,
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
    expiresIn: 60 // expires in 24 hours (60*24=1444)
  };
  let secret = app.get('superSecret');

  var token = jwt.sign(user, secret, options);
  console.log();
  return token;
  //return jwt.generaToken(app,user);
}

function checkToken(app, req) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  console.info('checkToken token enviado es ' + token);
  if (token) {
    try {
      let secret = app.get('superSecret');

      var decoded = jwt.verify(token, secret);

      return {
        success: true,
        decoded: decoded
      }

    } catch (err) {
        let errorResponse = {
            status:200,
            success: false,
            message: 'Failed to authenticate token. \n' + err
          };
          console.log(clc.red(errorResponse));
          //return res.status(401).send(errorResponse);
          return errorResponse;
    }

  } else {
    // if there is no token/ return an error
    let errorResponse = {
        status:403,
        success: false,
        message: 'No token provided'
      };
    return errorResponse;

  }
}
//Esto lo usa el middleware para intersectar llamadas a la api
//Insersecta cualquier llamada al server del backend (ej rutas 'api/priv')
//y les verifica el token.. Si el token es valido y no expiro se decodifica y le 
//establece en el req.decoded la indfo de la session para q sea utilizada por la API en cuestion  --> next;
function checkSecurity(app, ruta) {
  app.use(ruta, (req, res, next) => {
    // la validación de la sesión es en memoria
    // jwt descifra y valida un token

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    console.log(clc.yellow('---------------checkSecurity-----------------------------'));
    console.log(clc.yellow('token = ' + token));
    console.log(clc.yellow('-----------------------------------------------------'));
    let secret = app.get('superSecret');
    // decode token
    if (token) {
      try {
        req.decoded = jwt.verify(token, secret);
        next();
      } catch (err) {

        let errorResponse = {
          success: false,
          message: 'Failed to authenticate token. \n' + err
        };
        console.log(clc.red(errorResponse));
        //401 Unauthorized
        return res.status(401).send(errorResponse);
      }


    } else {
        //403 Forbidden
      // if there is no token/ return an error
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });

    }

  })
}





/**
 * los registros de usuario se crean físicamente en base de datos pero en este ejemplo 
 * se hacen en un array local
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
    resolve(user);
  });
}

const users = [{
    userName: 'moviedo',
    password: '1234',
    email: 'moviedo@pelsoft.ar'
  },
  {
    userName: 'admin',
    password: '1234',
    email: 'admin@pelsoft.ar'
  },
  {
    userName: 'mrenaudo',
    password: '1234',
    email: 'mrenaudo@pelsoft.ar'
  },
];
