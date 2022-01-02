const { Category, Users, Role, Product } = require("../models");

 const roleValidate = async( rol = '' ) => {

    const existRol = await Role.findOne( { rol } );

    if (!existRol) {
        throw new Error(`Este rol ${rol}, no esta registrado.`);
    }
}

 const emailValidExist = async( email = '' ) => {

    const existEmail = await Users.findOne( { email } );

    if ( existEmail ) {
        throw new Error(`Este email ${email}, ya esta registrado.`);
    }
}

const userValidExist = async( idUser ) => {

    const existUser = await Users.findById( idUser );

    if ( !existUser ) {
        throw new Error(`El usuario con el id ${idUser}, no esta registrado.`);
    }
}


const categoryValidExist = async( name = '') => {
 
    name = name.toUpperCase();
    
    const categoryExist = await Category.findOne({ name });

    if ( categoryExist ) {
        throw new Error (`La categoria ${ categoryExist.name } ya esta registrada`);
    }
}

const categoryValidExistById = async( idCategory ) => {

    const existCategory = await Category.findById( idCategory );

    if ( !existCategory ) {
        throw new Error(`La categoria con el id ${idCategory}, no esta registrado.`);
    }
}

const productValidExistById = async( idProduct ) => {

    const existProduct = await Product.findById( idProduct );

    if ( !existProduct ) {
        throw new Error(`La categoria con el id ${idProduct}, no esta registrado.`);
    }
}

/**
 * Validar las collecciones permitidas
 * @param {*} collection 
 * @param {*} collectionPermit 
 */
const collectionPermit = async ( collection = '' , collections = []) =>{

    if ( !collections.includes(collection) ) {

        throw new Error(`La coleccion ${collection}, no es permitida. - ${collections}`);
    
    }

    return true;

}


module.exports = {
    roleValidate,
    emailValidExist,
    userValidExist,
    categoryValidExist,
    categoryValidExistById,
    productValidExistById,
    collectionPermit
} 