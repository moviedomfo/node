// library that will validate the access tokens in your API

var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var clc = require('cli-color');
const fetch = require("node-fetch");


var port = process.env.PORT || 8080;

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://pelsoftmfo.auth0.com/.well-known/jwks.json"
    }),
    audience: 'https://celamltda.com.ar',
    issuer: "https://pelsoftmfo.auth0.com/",
    algorithms: ['RS256']
});
console.log(clc.yellow('initilizing server ' ));
//app.use(jwtCheck);

app.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});

app.get('/', function(req, res) {
    var item = {
        saludo:"El server funciona OK",
        name:"server http://localhost:8080/",
        ip:"10.255.102.1"
    }
    
    console.log(item);
    res.send(item);
 });

 app.get('/commentList', jwtCheck,function (req, res) {
  console.log(clc.blue("GET to  /postList" ));
  var url = 'https://jsonplaceholder.typicode.com/comments';

  fetch(url)
      .then(response => {
        response.json().then(json => {
          res.json(json);
        });
      })
      .catch(error => {
        console.log(error);
        res.send("Error");
      });
      
});

app.get('/postList', function (req, res) {
    console.log(clc.blue("GET to  /postList" ));
    var url = 'https://jsonplaceholder.typicode.com/posts';
 
    fetch(url)
        .then(response => {
          response.json().then(json => {
            res.json(json);
          });
        })
        .catch(error => {
          console.log(error);
          res.send("Error");
        });
        
  });

 app.listen(port,function(){
    console.log(clc.yellow("Started on PORT " + port));
  })

