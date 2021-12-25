const { request, response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const { generateJwt } = require("../helpers/generate-jwt");

const authLoginPost = async(req = request, res=response) => {

    const { email, password } = req.body;
 
    try {

        const user =  await User.findOne( { email } );

        if ( !user ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo.'
            })
        }
    
        
        if ( !user.state ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: inactivo.'
            });
        }
        
        const validPassword = bcrypt.compareSync( password, user.password )

        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - contraseña'
            })
        }

        const token = await generateJwt( user.id );


        res.status(200).json({
            token,
            user
        });

    } catch (error) {
        
        console.log(error);
        
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }


}


module.exports = {
    authLoginPost 
}