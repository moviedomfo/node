

const fetch = require("node-fetch");
const clc = require('cli-color');
var comments= [];

module.exports = (app, ruta) => {
  
  const clc_error = clc.xterm(161);
  const clc_log_green_Gray = clc.xterm(116);
  var clc_Orange  = clc.xterm(202);
  //var jwks = require('jwks-rsa');


  // var jwt = require('express-jwt');
  // var jwtCheck = jwt({
  //     secret: jwks.expressJwtSecret({
  //         cache: true,
  //         rateLimit: true,
  //         jwksRequestsPerMinute: 5,
  //         jwksUri: "https://pelsoftmfo.auth0.com/.well-known/jwks.json"
  //     }),
  //     audience: 'https://celamltda.com.ar',
  //     issuer: "https://pelsoftmfo.auth0.com/",
  //     algorithms: ['RS256']
  // });




  // app.use('/api', jwt({
  //   secret: 'cat',
  //   credentialsRequired: false,
  //   getToken: function fromHeaderOrQuerystring (req) {
  //     if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
  //         return req.headers.authorization.split(' ')[1];
  //     } else if (req.query && req.query.token) {
  //       return req.query.token;
  //     }
  //     return null;
  //   }
  // }));

//app.use(jwtCheck);

app.route(`${ruta}`).get( function (req, res) {
  console.log(clc.bgRed("GET to " + ruta ));
   res.send('Holaaaaaaaaaaaaaaaaaaaaaaa' )
});

//http://localhost:8080/api/placeHolders/priv/addComment
app.route(`${ruta}/priv/addComment`)
  .post(function (req, res) {
        
        var comment = req.body.comment; //req.params.comment;
        if(comment)
        {
          comments.push(comment);
        }
        res.send(comments);
            
      });
    //API privada retorna los comentatios agregados de forma privada
      app.route(`${ruta}/priv/commentList`).get(function (req, res) {
        
        console.log(clc.yellow(JSON.stringify( req.decoded)));

        res.send(comments);
 
    });
    //API que recive filtro publica
     app.route(`${ruta}/commentList2`).get(function (req, res) {
            
            var url = 'https://jsonplaceholder.typicode.com/comments';
            console.log(clc.blue(req.decoded));
            var postIdFilter = req.query.postId;
           
            if(postIdFilter)
            {
              url = url + "?postId=" +  postIdFilter;
            }
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



    app.get(`${ruta}/commentList`,function (req, res) {
      console.log(clc_log_green_Gray('get to commentList'));
      // console.log(clc_error('get to commentList'));
      // console.log(clc_Orange('get to commentList'));
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
          console.log(clc.yellow("GET to  /postList" ));
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
