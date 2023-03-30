const {ApolloServer}= require ('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');

const conectarDB = require ('./config/db');

//conectar la base de datos
conectarDB();

//Servidor
const server = new ApolloServer(
    {
        typeDefs,
        resolvers,
    }
);

//Arranca el servidor
server.listen().then(({url})=>{
    console.log(`Servidor listo en la URL ${url}`)
})

