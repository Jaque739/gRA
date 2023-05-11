const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema ({

    nombre: {
        type: String,
        required:true,
        trim: true

    },
    apellidos: {
        type: String,
        required:true,
        trim: true
    },
    telefono: {
        type: String,
        required:true,
        trim: true
    },
    direccion: {
        type: String,
        required:true,
        trim: true
    },
    nom_lugar: {
        type: String,
        required:true,
        trim: true
    },
    giro: {
        type: String,
        trim: true
    },
    direc_lugar: {
        type: String,
        required:true,
        trim: true
    },
    cord_log: {
        type: String,
        required:true,
        trim: true
    },
    cord_lat: {
        type: String,
        required:true,
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
    administrador: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    creado: {
        type: Date,
        default: Date.now()
    }

});
module.exports = mongoose.model('Usuario', UsuariosSchema);