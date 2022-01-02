
const fieldaValidateDb = require('./fieldsValidateDb');
const generateJwt      = require('./generate-jwt');
const googleVerify     = require('./google-verify');
const uploadFile       = require('./uploadFile')


module.exports = {
    ...fieldaValidateDb,
    ...generateJwt,
    ...googleVerify,
    ...uploadFile
}