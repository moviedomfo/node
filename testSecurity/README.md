# TestSecurity

This project was generated with [Angular CLI] version 1.5.0.
based on 
https://auth0.com/blog/angular-2-authentication/

## Sever

## client
1 )  install the auth0-js library
    npm install auth0-js --save
2 ) create auth service
    ng g s auth/auth --no-spec

    
## paginas utiles

https://docs.google.com/document/d/146BRYZ7SfPP6PlhNC31bsotbcnc2EJbs-shFp8FzwXA/edit#


Qué es la autenticación basada en Token?
https://carlosazaustre.es/que-es-la-autenticacion-con-token/

Introducción a JSON Web Tokens (JWT)
https://platzi.com/blog/introduccion-json-web-tokens/

Authenticate a Node.js API with JSON Web Tokens
https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens


Utilización del middleware
http://expressjs.com/es/guide/using-middleware.html

## URL to test:
placeholders
http://localhost:8080/api/placeHolders/commentList2?postId=3

user.js  
		http://localhost:8080/api/users/metodosGet2
		http://localhost:8080/api/users/metodosGet1 
data:
    http://localhost:8080/api/placeHolders/commentList2
    params : 
        postId
common.js
	http://localhost:8080
	
	
## user api

POST 
    http://localhost:8080/api/users/authenticate

    Enviar en el BODY  un raw JSON (application /json)

    {
    "user" :{
        "userName": "moviedo",
        "password": "1234",
        "email": "moviedo@pelsoft.ar" 
        }
    }

GET Obtener un usuario :
    http://localhost:8080/api/users/mrenaudo

    El parametro es http://localhost:8080/api/users/{{ID}}







