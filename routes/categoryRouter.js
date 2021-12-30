const { Router } = require("express");
const { check } = require("express-validator");


const { categoryGetAll, categoryGetById, createCategoryPost, updateCategoryPut, deleteCategoryById } = require("../controllers/categoryController");
const { categoryValidExist, categoryValidExistById } = require("../helpers/fieldsValidateDb");
const { validateJwt, fieldsValidate, validByRol } = require("../middlewares");

const router = Router();

//PETICIONES

// TODO: obtener las todas la categorias - publico
router.get("/", categoryGetAll);

// TODO: obtener una categoria - publico
router.get("/:idCategory",[
    check('idCategory', 'No es un ID válido para mongo').isMongoId(),
    fieldsValidate
], categoryGetById );


// TODO: crear una nueva categoria - a cualquier rol
router.post("/",[
    validateJwt,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('name').custom( categoryValidExist ),
    fieldsValidate
], createCategoryPost);

// TODO: actualizar una categoria - a cualquier rol
router.put("/:idCategory",[
    validateJwt,
    check('idCategory', 'No es un ID válido para mongo').isMongoId(),
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('idCategory').custom( categoryValidExistById ),  
    fieldsValidate 
] ,updateCategoryPut);

// TODO: borrar una categoria - a cualquier ADMIN
router.delete("/:idCategory",[
    validateJwt,
    validByRol('SUPER_ROL', 'ADMIN_ROL'),
    check('idCategory', 'No es un ID válido para mongo').isMongoId(),
    check('idCategory').custom( categoryValidExistById ),  
    fieldsValidate 
] ,deleteCategoryById);




module.exports = router;