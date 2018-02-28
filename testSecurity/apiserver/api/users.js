/**
 * Permite que un usuario se registre
 * Es una inserción de un objeto en el recuros de usuarios
 */
// Usa la librería de seguridad
const seguridad = require('./../security/security.js')
const clc = require('cli-color');
//ruta = '/api/pub/users'
module.exports = (app, ruta) => {

 app.route(`${ruta}/registry`)
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
            }), function(err) {
                console.log(err);
            };
    });


//ruta = '/api/pub/users/authenticate'
app.route(`${ruta}/authenticate`)
.post((req, res) => {

    

     let userToAuthenticate = req.body.user;
     console.log(clc.yellow('req.body.user ' + JSON.stringify(req.body.user)));
    console.log(clc.yellow('authenticate ' + userToAuthenticate.userName));
    console.log(clc.yellow('authenticate ' + JSON.stringify(userToAuthenticate)));
    seguridad.existeUsuario_byname(userToAuthenticate.userName)
    .then(resultUser => {
        //console.log("usuario encontrado " +  JSON.stringify(resultUser));
        if (resultUser) {
            
            if (resultUser.password != userToAuthenticate.password) {
                //res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                res.send({ success: false, message: 'Authentication failed. Wrong password.' });
              } 
            // si el usuario existe y la password esta ok creamos el token con el usuario como payload
            // we don't want to pass in the entire user since that has the password
         
              var token = seguridad.newSession(app,resultUser);

              var result = { 
                    user: resultUser, 
                    token: token };

              res.send(JSON.stringify(result));
            //   res.json({ 
            //       user: resultUser, 
            //     token: token });
        }
        else{
         //res.send('');
         res.json({ success: false, message: 'Authentication failed. User not found.' });
        }
    });
    
 });

///	http://localhost:8080/api/pub/users/1555
app.route(`${ruta}/:id`)
    .get((req, res) => {
       var userName = req.params.id;
       //console.log(clc.yellow('buscando ' + userName));
       seguridad.existeUsuario_byname(userName)
       .then(result => {
           if (result) {
               console.log(`El usuario existe: ${result.email}`)
               res.send(JSON.stringify(result));
           }
           else{
            res.send('el usuario ' + req.params.id + ' no existe ');
           }
       });
       
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