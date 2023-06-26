const mongoose = require('mongoose');

const SitioSchema = mongoose.Schema ({
    
    nombre:{
        type: String,
        required:true,
        trim: true
    },

    rfc: {
        type: String,
        required:true,
        trim: true

    },
    telf: {
        type: String,
        required:true,
        trim: true

    },
    direc: {
        type: String,
        required:true,
        trim: true

    },
    horario: {
        type: String,
        required:true,
        trim: true

    },
    pag_web: {
        type: String,
        required:true,
        trim: true

    },
    fb: {
        type: String,
        required:true,
        trim: true

    },
    ig: {
        type: String,
        required:true,
        trim: true

    },
    pueblos: {
        type: String,
        required: true,
        trim: true
    },

    form_pago: {
        type: String,
        required:true,
        trim: true

    },
    foto_pres: {
        type: String,
        required:true,
        trim: true

    },
    foto_menu: {
        type: String,
        required:true,
        trim: true

    },
    foto_lugar: {
        type: String,
        required:true,
        trim: true

    },

    creado: {
        type: Date,
        default: Date.now()
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuarios'
    }

});
module.exports = mongoose.model('Sitio', SitioSchema);