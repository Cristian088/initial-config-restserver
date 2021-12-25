const { request, response } = require("express");


const validateRol = async(req = request, res = response, next) => {

    if (!req.userAuth) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin el token primero.'
        });
    }

    const { name, rol } = req.userAuth;

    if (rol != 'ADMIN_ROL') {
        return res.status(401).json({
            msg: `El usuario ${name} no tiene permiso para esta accion.`
        });
    }


    next();
}

const validByRol = ( ...roles ) => {
    
    return (req = request, res = response, next) => {

        if (!req.userAuth) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin el token primero.'
            });
        }

        if ( !roles.includes( req.userAuth.rol ) ) {
            return res.status(401).json({
                msg: `El usuario ${req.userAuth.name} no tiene permiso para esta accion.`
            }); 
        }

        next();
    }

}


module.exports = {
    validateRol,
    validByRol
}