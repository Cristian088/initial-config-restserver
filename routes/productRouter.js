const { Router } = require("express");
const { check } = require("express-validator");
const { createProduct, 
        getProductAll, 
        getProductById, 
        updateProductById, 
        deleteProductById } = require("../controllers/productController");
const { categoryValidExistById, productValidExistById } = require("../helpers/fieldsValidateDb");
const { fieldsValidate, validateJwt, validByRol } = require("../middlewares");

const router = Router();

router.get('/', getProductAll)

router.get('/:idProdruct',[
    check('idProdruct','el id no es valido para mongo').isMongoId(),
    check('idProdruct').custom( productValidExistById ),
    fieldsValidate
], getProductById )

router.post("/",[
   validateJwt,
   check("name", "El nombre es requerido").not().isEmpty(),
   check('categorie','La categoria es requerida').not().isEmpty(),
   check('categorie','La categoria no es valido').isMongoId(),
   check('categorie').custom( categoryValidExistById ),
   fieldsValidate
  ], createProduct );

router.put('/:idProdruct', [
  validateJwt,
  check('idProdruct','el id no es valido para mongo').isMongoId(),
  check('idProdruct').custom( productValidExistById ),
  fieldsValidate
], updateProductById )

// TODO: ELIMINAR UN PRODUCTO POR ID
router.delete('/:idProdruct', [
  validateJwt,
  validByRol('SUPER_ROL', 'ADMIN_ROL'),
  check('idProdruct','el id no es valido para mongo').isMongoId(),
  check('idProdruct').custom( productValidExistById ),
  fieldsValidate
],deleteProductById)

module.exports = router;
