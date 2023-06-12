const mongoose = require('mongoose');

const ContactosSchema = mongoose.Schema ({

    nombre: {
        type: String,
        required:true,
        trim: true

    },
    email: {
        type: String,
        required:true,
        trim: true
    },
    telefono: {
        type: String,
        required:true,
        trim: true
    },
    mensaje: {
        type: String,
        required:true,
        trim: true
    },
   
    creado: {
        type: Date,
        default: Date.now()
    }

});
module.exports = mongoose.model('Contactos', ContactosSchema);