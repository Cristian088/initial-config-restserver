const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        
        await mongoose.connect(process.env.MONGO_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Conexión al origen de datos creada');

    } catch (error) {
        console.log('msg: ',error);
        throw new Error('No se puedo crear una conexión al origen de datos');
    }

}

module.exports = {
    dbConnection
}