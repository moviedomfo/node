const fetch = require("node-fetch");
const clc = require('cli-color');
module.exports = (app, ruta) => {



  app.get('/', function(req, res) {
    var item = {
        saludo:"El server funciona OK",
        name:"server http://localhost:8080/",
        ip:"10.255.102.1"
    }
    console.log(clc.green("GET to " + item ));
    console.log(item);
    res.send(item);
 });

  
}
