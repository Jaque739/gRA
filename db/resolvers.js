const Admi = require('../models/Admi');
const Usuario = require ('../models/Usuarios');
const Sitio = require ('../models/Sitio');
const bcryptjs = require ('bcryptjs');
const jwt = require('jsonwebtoken');
require ('dotenv').config({ path: 'variables.env'});

const crearToken = (admi, secreta, expiresIn) =>{
    //console.log(usuario);
    const{id,nombre, apellidos, email}= admi;

    return jwt.sign( {id,nombre,apellidos,email}, secreta, {expiresIn} )
} 


//Resolvers
const resolvers = {
    Query: {
          obtenerAdmi: async (_, { token }) => {
            const admiId = await jwt.verify(token, process.env.SECRETA)

            return admiId
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
        nuevoUsuario: async (_, {input}) => {

            const {us, contra} = input;
           
            //Revisar si el usuario ya esta registrado
            const existeUsuario = await Usuario.findOne({us});
            if (existeUsuario){
                throw new Error('El usuario ya existe');
            }
            
            //Hashear su contraseña
           const salt = await bcryptjs.genSalt(10);
           input.contra = await bcryptjs.hash(contra,salt);
            
            // Guardalo en la base de datos
            try{
                const usuario = new Usuario(input);
                usuario.save();
                return usuario;
            }catch (error) {
                console.log(error);
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
        } 
    }
}


module.exports = resolvers;