const mongoose = require ('mongoose');


const conectarDB = async () => {

   

    try {
        // await mongoose.connect ("mongodb+srv://karlavianney99:root@cluster0.jmcvy4k.mongodb.net/ProyectoBD", {

        // });
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
            // useFindAndModify:false,
            // useCreateIndex: true
        });
    
        console.log('BD Conectada');
    }
    catch (error) {
        console.log('Hubo un error');
        console.log(error);
        process.exit(1);
    }

   
}
module.exports = conectarDB;