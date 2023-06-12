const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema ({

    nombre: {
        type: String,
        required:true,
        trim: true

    },
    apellido: {
        type: String,
        required:true,
        trim: true
    },
    telefono: {
        type: String,
        required:true,
        trim: true
    },
    email:{
        type: String,
        require: true,
        trim: true
    },
    us: {
        type: String,
        required:true,
        trim: true,
        unique: true
    },
    contra: {
        type: String,
        required:true,
        trim: true
    },
    creado: {
        type: Date,
        default: Date.now()
    },
    vendedor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Admi'
    }

});
module.exports = mongoose.model('Usuario', UsuariosSchema);