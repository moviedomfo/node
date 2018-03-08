// library that will validate the access tokens in your API

/** Carga de módulos de librerías estándar */
// express
const express = require('express');
// aplicación express
const app = express();
/** Carga de módulos propios */
const middleware = require('./middleware');
var clc = require('cli-color');
console.log(clc.yellow('initilizing server ' ));

middleware.useMiddleware(app);


var port = process.env.PORT || 8080;
const bodyParser = require('body-parser')

// Configuración de rutas
require('./api/serviceIndex')(app);

app.listen(port,function(){
  console.log(clc.yellow("API server started on PORT " + port));
})








  