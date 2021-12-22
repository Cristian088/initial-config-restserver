const { Router } = require("express");
const { check } = require("express-validator");

const { fieldsValidate } = require("../middlewares/fieldsValidate");
const { roleValidate, emailValidExist, userValidExist } = require("../helpers/fieldsValidateDb");

const { usersGet, 
        usersPost, 
        usersPut, 
        usersDelete } = require("../controllers/userController");

const router = Router();

//PETICIÓN GET
router.get("/", usersGet );

//PETICIÓN POST
router.post("/", [
    check('name','El nombre es obligatorio.').not().isEmpty(),
    check('password','La contraseña debe ser mayor a 6 caracteres').isLength( { min: 6 } ),
    check('password','La contraseña es obligatorio.').not().isEmpty(),
    check('email','El correo no es valido.').isEmail(),
    check('email').custom( emailValidExist ),
    check('rol').custom( roleValidate ),
    fieldsValidate
],usersPost);

//PETICIÓN PUT
router.put("/:idUser", [
    check('idUser', 'No es un ID válido para mongo').isMongoId(),
    check('idUser').custom( userValidExist ),
    check('rol').custom( roleValidate ),
    fieldsValidate
],usersPut);

//PETICIÓN DELETE
router.delete("/:idUser", [
    check('idUser', 'No es un ID válido para mongo').isMongoId(),
    check('idUser').custom( userValidExist ),
    fieldsValidate
],usersDelete);

module.exports = router;
