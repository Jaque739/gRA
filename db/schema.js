const { gql } = require ('apollo-server');


//Schema
const typeDefs = gql`

type Admi{
    id: ID
    nombre: String
    apellidos: String
    email: String
    password: String
}

type Usuario{

    id: ID
    nombre: String
    apellidos: String
    telefono: String
    direccion: String
    nom_lugar: String
    giro: String
    direc_lugar: String
    cord_log: String
    cord_lat: String
    us: String
    creado: String
    administrador: id
}
    type Token {
        token: String
    }

    type Sitio {
        id: ID
        rfc: String
        telf: Int
        direc: String
        horario: String
        pag_web: String
        fb: String
        ig: String
        form_pago: String
        foto_pres: String
        foto_menu: String
        foto_lugar: String
        creado: String
    }

input AdmiInput{
    nombre: String
    apellidos: String
    email: String
    password: String
}

input UsuarioInput{
    nombre: String!
    apellidos: String!
    telefono: String!
    direccion: String!
    nom_lugar: String!
    giro: String
    direc_lugar: String!
    cord_log: String!
    cord_lat: String!
    us: String!
    contra: String!
}

input AutenticarInput{
    email: String!
    password: String!
}

input SitioInput {
    rfc: String
    telf: Int!
    direc: String!
    horario: String!
    pag_web: String
    fb: String
    ig: String
    form_pago: String
    foto_pres: String
    foto_menu: String
    foto_lugar: String!
}

type Query {
    #Usuarios
    obtenerAdmi(token: String!) : Admi

    #Sitio
    obtenerSitio: [Sitio]
    obtenerSitios(id: ID!) : Sitio
}

type Mutation {
    #Administradores
    nuevoAdmi (input: AdmiInput): Admi
    autenticarAdmi(input: AutenticarInput) : Token

    #Sitio
    nuevoSitio (input: SitioInput) : Sitio
    actualizarSitio (id: ID!, input : SitioInput ) : Sitio
    eliminarSitio(id: ID!) : String

    #Usuarios
    nuevoUsuario (input: UsuarioInput): Usuario
}

`;
module.exports = typeDefs;