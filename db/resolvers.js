const Admi = require('../models/Admi');
const Usuario = require ('../models/Usuarios');
const Sitio = require ('../models/Sitio');
const bcryptjs = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const Contactos = require('../models/Contactos');
require ('dotenv').config({ path: 'variables.env'});

const crearToken = (cuenta, secreta, expiresIn) =>{
    //console.log(usuario);
    const{id,nombre, apellidos, email, us }= cuenta;
    

    return jwt.sign( {id,nombre,apellidos,email, us }, secreta, {expiresIn} )
} 


//Resolvers
const resolvers = {
    Query: {
          obtenerAdmi: async (_, { token }) => {
            const admiId = await jwt.verify(token, process.env.SECRETA)

            return admiId
        }, 


        obtenerUsuario: async (_, { token }) => {
            const usuarioId = await jwt.verify(token, process.env.SECRETA)

            return usuarioId
        }, 

    
        obtenerSitio: async () => {
            try{
                const sitio = await Sitio.find({});
                return sitio;
            }catch (error){
                console.log(error);
            }
        },
        obtenerSitios: async (_,{id}) => {
            //revisar si el sitio existe o no
            const sitio = await Sitio.findById(id);

            if(!sitio) {
                throw new Error('Sitio no encontrado');
            }
            return sitio;
        },
        obtenerUsuarios: async () => {
            try {
                const usuario = await Usuario.find({});
                return usuario;
            } catch (error) {
                console.log(error);                
            }
        },

        obtenerUsuariosVendedor: async (_, {}, ctx) => {
            try {
                const usuario = await Usuario.find({ });
                return usuario;
            } catch (error) {
                console.log(error);              
            }
        },
        
        obtenerUsuario: async (_, {id}, ctx) => {
            //Revisar si el cliente exixte o no 
            const usuario = await Usuario.findById(id);

            if(!usuario){
                throw new Error('Usuario no encontrado');
            }
            return usuario;
            
        }

        },
    Mutation: {
        nuevoAdmi: async (_, {input}) => {

            const {email,password}= input;

           //Revisar si el Asmi ya esta registrado
            const existeAdmi = await Admi.findOne({email});
            if(existeAdmi){
                throw new Error('El Administrador ya existe');
            }

           //Hashear su contraseña
           const salt = await bcryptjs.genSalt(10);
           input.password = await bcryptjs.hash(password,salt);

           try{
            //Guardarlo en la base de datos
            const admi = new Admi(input);
            admi.save(); //guardar
            return admi;
           }catch(error){
                console.log(error);
           }
        },
        autenticarAdmi: async (_, {input}) => {
            const {email, password} = input;
            
            //Si elusuario existe
            const existeAdmi = await Admi.findOne({email});
            if(!existeAdmi){
                throw new Error('El Administrador no existe');
            }
            //Si la contraseña es correcta
            const passwordCorrecta = await bcryptjs.compare(password, existeAdmi.password);
            if(!passwordCorrecta){
                throw new Error('La contraseña es incorrecta');
            }

            //Crear el token
            return{
                token: crearToken(existeAdmi, process.env.SECRETA, '24h')

            }

        },
        
        nuevoSitio: async (_,{input}) => {
            try{
                const sitio = new Sitio(input);

                //almacenar en la bd
                const resultado = await sitio.save();

                return resultado;
            }catch(error) {
                console.log(error);
            }
        },
        actualizarSitio: async (_,{id,input}) => {
            //revisar si el sitio existe o no
            let sitio = await Sitio.findById(id);

            if(!sitio) {
                throw new Error('Sitio no encontrado');
            }
            //guardarlo en la base de datos
            sitio = await Sitio.findOneAndUpdate({_id : id}, input, {new: true});

            return sitio;
        },
        eliminarSitio: async(_,{id}) => {
            //revisar si el sitio existe o no
            let sitio = await Sitio.findById(id);

            if(!sitio) {
                throw new Error('Sitio no encontrado');
            }

            //Eliminar
            await Sitio.findOneAndDelete({_id : id});
            return "Producto eliminado";
        },
        
        nuevoUsuario: async (_, {input}, ctx) => {

            console.log(ctx);

            const {us} = input
            //Verificar si el cliente ya esta refistrado
            //console.log(input);

            const usuario = await Usuario.findOne({us});
            if(usuario){
                throw new Error('El usuario ya existe'); 
            }

            const nuevoUsuario = new Usuario(input);

            //asignar el vendedor

            nuevoUsuario.vendedor =  '646fcf0e12d0d733ccf62102';
            //guardarlo en la base de datos

            try {
            
                const resultado = await nuevoUsuario.save(); 
                //console.log('Desde resolvers resultado ', resultado );
                return resultado;
                
            } catch (error) {
                console.log('hubo un error ', error);
            }
        },

        autenticarUsuario: async (_, {input}) => {
            
            const {us, contra} = input;
            
            //Si elusuario existe
            const existeUs = await Usuario.findOne({us});
            if(!existeUs){
                throw new Error('El Usuario no existe');
            }
            //Si la contraseña es correcta
            const contraCorrecta = await bcryptjs.compare(contra, existeUs.contra);
            if(!contraCorrecta){
                throw new Error('La contraseña es incorrecta');
            }

            //Crear el token
            return{
                token: crearToken(existeUs, process.env.SECRETA, '24h')

            }

        },

        actualizarUsuarios: async (_,{id,input},ctx) => {
            //Verifivar si existe o no 
            let usuario = await Usuario.findById(id);

            if(!usuario){
                throw new Error('El usuario no existe');
            }
            
            //Verificar si el vendedor es el que edita

            //guardar cliene
            usuario = await Usuario.findOneAndUpdate({_id : id},input, {new: true});
            return usuario;
        },

        eliminarUsuario: async (_,{id},ctx) => {
             //Verifivar si existe o no 
             let usuario = await Usuario.findById(id);

             if(!usuario){
                 throw new Error('El usuario no existe');
             }

             //Eliminar Usuario 
             await Usuario.findByIdAndDelete({_id : id});
             return "Usuario Eliminado"
        },
        
        nuevoContacto: async (_, {input}, ctx) => {
          
            console.log(input);
            //asignar al administrador 
            const{email} = input

            const contactos = await Contactos.findOne({email})

            const nuevoContacto = Contactos(input);

            //guardar en la base de datos 
            const resultado =  await nuevoContacto.save();
                return resultado;
        }
        
    }
}


module.exports = resolvers;