const { request, response } = require("express")
const jwt = require("jsonwebtoken");
const Users = require('../models/userModel');



const validateJwt = async( req = request, res = response, next )  => {
 
    const token = req.header('x-token');

    if ( !token ) {
        res.status(401).json({
            msg: 'No hay token en la petición.'
        })
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);

        const user = await Users.findById( uid );

        if ( !user ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario autenticado no existe '
            });
        }

        if ( !user.state ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario autenticado inactivo '
            });
        }

        req.userAuth = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }


}

module.exports = {
    validateJwt
}