const { Router } = require("express");
const { check } = require("express-validator");

const { authLoginPost, authGooglenPost } = require("../controllers/authController");
const { fieldsValidate } = require("../middlewares/fieldsValidate");

const router = Router();

router.post("/login", [
    check('email','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    fieldsValidate
], authLoginPost );

router.post("/google", [
    check('idToken','Token de google es necesario').not().isEmpty(),
    fieldsValidate
], authGooglenPost );



module.exports = router;