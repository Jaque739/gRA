const {ApolloServer}= require ('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const conectarDB = require ('./config/db');
const Usuarios = require('./models/Usuarios');
const jwt = require ('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});


//conectar la base de datos
conectarDB();

//Servidor
const server = new ApolloServer(
    {
        typeDefs,
        resolvers,
        context: ({ req }) => {
           // console.log('Headers: ', req.headers['authorization']);
     

           //console.log(req.headers);
            // si no se pasa ese header llamado authorization asigne un string vacio
            const token = req.headers['authorization'] || '';
     
            if (token) {
                try {
     
                    // importo jwt para verificar el token
                    const admi = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA);
                    console.log(admi)
                    return {
                        admi
                    }
     
     
                } catch (error) {
     
                    console.log("Hubo un error");
                    console.log(error);
     
                }
            }
        }
    }
);

//Arranca el servidor
server.listen().then(({url})=>{
    console.log(`Servidor listo en la URL ${url}`)
})

