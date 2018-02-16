


/** librería de encriptado */
const jsonwebtoken = require('jsonwebtoken')
const secreto = 'pelsoftIt'

/** cifra el usuario durante un margen de tiempo */
exports.generaToken = (usuario) => jsonwebtoken.sign(usuario, secreto, { expiresIn: 60 })

/** verifica al usuario a partir del token  */
exports.verify = (token) => {
    try {
        return jwt.verify(token, secreto)
    }
    catch(err){
        return false
    }
}