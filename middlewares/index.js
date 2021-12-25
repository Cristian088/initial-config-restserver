
const fieldsValidate  = require("../middlewares/fieldsValidate");
const validateJwt = require("../middlewares/validate-jwt");
const validByRol = require("../middlewares/validate-rol");


module.exports = {
    ...fieldsValidate,
    ...validateJwt,
    ...validByRol
}