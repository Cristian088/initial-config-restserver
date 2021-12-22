const Role = require('../models/roleModel');
const Users = require('../models/userModel');

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


module.exports = {
    roleValidate,
    emailValidExist,
    userValidExist
} 