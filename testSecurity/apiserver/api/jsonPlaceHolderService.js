

const fetch = require("node-fetch");
const clc = require('cli-color');
module.exports = (app, ruta) => {

  var jwks = require('jwks-rsa');


  var jwt = require('express-jwt');
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




  app.use('/api', jwt({
    secret: 'cat',
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring (req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    }
  }));

//app.use(jwtCheck);

app.route(`${ruta}`).get( function (req, res) {
  console.log(clc.bgRed("GET to " + ruta ));
   res.send('Holaaaaaaaaaaaaaaaaaaaaaaa' )
});

app.route(`${ruta}/commentList2`)
  .get(function (req, res) {
        console.log(clc.red("GET to  /commentList2" ));
        var url = 'https://jsonplaceholder.typicode.com/comments';
      
        fetch(url)
            .then(response => {
              response.json().then(json => {
                res.json(json);
              });
            })
            .catch(error => {
              console.log(error);
              res.send(error);
            });
            
      });
  
    app.get(`${ruta}/commentList`, jwtCheck,function (req, res) {
        console.log(clc.bgRed("GET to  /commentList" ));
        var url = 'https://jsonplaceholder.typicode.com/comments';
      
        fetch(url)
            .then(response => {
              response.json().then(json => {
                res.json(json);
              });
            })
            .catch(error => {
              console.log(error);
              res.send(error);
            });
            
      });
      
      app.get(`${ruta}/postList`, function (req, res) {
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
                res.send(error);
              });
              
        });
}
