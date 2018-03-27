

const fetch = require("node-fetch");
const clc = require('cli-color');

var comments = [];

module.exports = (app, ruta) => {
  const multer = require('multer')

  const moment = require ('moment');
  const clc_error = clc.xterm(161);
  const clc_log_green_Gray = clc.xterm(116);
  var clc_Orange = clc.xterm(202);

  //var jwks = require('jwks-rsa');


  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename:  (req, file, cb) =>{
      var today = moment(new Date()); 
      
      //console.log( today.format('YYYY_MM_DD_hh_mm_ss'));

      cb(null, today.format('YYYY_MM_DD_hh_mm_ss') +  '_' + file.originalname);
    }
  });
  //const upload = multer(   {dest : 'uploads/'});
  const upload = multer({ storage: storage });
  app.route(`${ruta}/uploadfile`).post(upload.single('file'), (req, res, next) => {
    //console.log(clc.bgRed(JSON.stringify(req.body )));
    console.log(clc.bgRed(JSON.stringify(req.file)));
    var name = req.body.name;
    var emailSender = req.body.emailSender;

    res.send('Hola' + name + ' ' + emailSender);
  });


  //app.use(jwtCheck);

  app.route(`${ruta}`).get(function (req, res) {
    console.log(clc.bgRed("GET to " + ruta));
    res.send('Holaaaaaaaaaaaaaaaaaaaaaaa')
  });

  //http://localhost:8080/api/placeHolders/priv/addComment
  app.route(`${ruta}/priv/addComment`)
    .post(function (req, res) {

      var comment = req.body.comment; //req.params.comment;
      if (comment) {
        comments.push(comment);
      }
      res.send(comments);

    });
  //API privada retorna los comentatios agregados de forma privada
  app.route(`${ruta}/priv/commentList`).get(function (req, res) {

    console.log(clc.yellow(JSON.stringify(req.decoded)));

    res.send(comments);

  });
  //API que recive filtro publica
  app.route(`${ruta}/commentList2`).get(function (req, res) {

    var url = 'https://jsonplaceholder.typicode.com/comments';
    console.log(clc.blue(req.decoded));
    var postIdFilter = req.query.postId;

    if (postIdFilter) {
      url = url + "?postId=" + postIdFilter;
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



  app.get(`${ruta}/commentList`, function (req, res) {
    console.log(clc_log_green_Gray('get to commentList'));
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
    console.log(clc.yellow("GET to  /postList"));
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

