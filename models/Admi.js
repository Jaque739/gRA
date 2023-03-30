const mongoose = require('mongoose');

const AdmiSchema = mongoose.Schema ({

    nombre: {
        type: String,
        required:true,
        trim: true
    },
    apellidos:{
        type: String,
        required:true,
        trim: true
    },
    email:{
        type: String,
        required:true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required:true,
        trim: true
    }
});

module.exports = mongoose.model('Admi', AdmiSchema);