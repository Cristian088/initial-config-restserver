const { Router } = require("express");
const { check } = require("express-validator");
const { loadFile, updateImge, viewImgs, updateImgeCloudinary } = require("../controllers/uploadsController");
const { collectionPermit } = require("../helpers");

const { validateJwt, fieldsValidate, validByRol, filesValidate } = require("../middlewares");

const router = Router();

router.get('/:collection/:idcollection',[
   check('idcollection','id no valido de mongo').isMongoId(),
   check('collection').custom( c => collectionPermit( c , ['users','products'] ) ),
   fieldsValidate
], viewImgs);


router.post('/', filesValidate ,loadFile);

router.put('/:collection/:idcollection', [
    filesValidate,
    check('idcollection','id no valido de mongo').isMongoId(),
    check('collection').custom( c => collectionPermit( c , ['users','products'] ) ),
    fieldsValidate
], updateImgeCloudinary );


module.exports = router;