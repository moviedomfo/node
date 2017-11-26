
const Constantes={
     CNN_STRING_HEALTH: {
            user: 'sa',
            password: 'as',
            server: 'SANTANA\\SQLEXPRESS2008',
            database: 'health3',

            options: {
                encrypt: true // Use this if you're on Windows Azure 
                }
            },
     
      HealthAPI_URL:"http://localhost:63251/api/"
}

module.exports =  Constantes;
// const  CNN_STRING_HEALTH  = {
//     user: 'sa',
//     password: 'as',
//     server: 'SANTANA\\SQLEXPRESS2008',
//     database: 'health3',

//     options: {
//         encrypt: true // Use this if you're on Windows Azure 
//     }
// }