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

type Usuario {

    id: ID
    nombre: String
    apellido: String
    telefono: String
    email: String
    us: String
    contra:String
    vendedor: ID
    creado: String

}
    type Token {
        token: String
    }

    type Sitio {
        id: ID
        nombre: String
        rfc: String
        telf: String
        direc: String
        horario: String
        pag_web: String
        fb: String
        ig: String
        pueblos: String
        form_pago: String
        foto_pres: String
        foto_menu: String
        foto_lugar: String
        creado: String
        cliente: ID
    }

    type Contactos {
    id: ID 
    nombre: String
    email: String
    telefono: String 
    mensaje: String
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
    apellido: String!
    telefono: String!
    email: String!
    us: String!
    contra: String!
}

input AutenticarInput{
    email: String!
    password: String!
}

input AutenticarUsInput{
    us: String!
    contra: String!
}

input SitioInput {
    nombre: String!
    rfc: String
    telf: String!
    direc: String!
    horario: String!
    pag_web: String
    fb: String
    ig: String
    pueblos: String!
    form_pago: String
    foto_pres: String
    foto_menu: String
    foto_lugar: String!
    
}

input ContactosInput {
    nombre: String!
    email: String!
    telefono: String! 
    mensaje: String!
    creado: String

}

type Query {
    #Usuarios
    obtenerAdmi(token: String!) : Admi

    #Sitio
    obtenerSitio: [Sitio]
    obtenerSitios(id: ID!) : Sitio
    obtenerSitioCliente: [Sitio]
    

    #Clientes
    obtenerUsuarios: [Usuario]
    obtenerUsuariosVendedor: [Usuario]
    obtenerUsuario(id: ID!): Usuario
    obtenerUsuarioID: Usuario
  
    
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
    actualizarUsuarios(id: ID!, input: UsuarioInput) :Usuario
    eliminarUsuario(id: ID!) : String
    autenticarUsuario(input: AutenticarUsInput) : Token

    

    #Contactos
    nuevoContacto(input: ContactosInput) : Contactos
}

`;
module.exports = typeDefs;