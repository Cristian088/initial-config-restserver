const { Router } = require("express");
const { usersGet, usersPost, usersPut, usersDelete } = require("../controllers/userController");

const router = Router();

//PETICIÓN GET
router.get("/", usersGet );

//PETICIÓN POST
router.post("/", usersPost);

//PETICIÓN PUT
router.put("/:idUser", usersPut);

//PETICIÓN DELETE
router.delete("/", usersDelete);

module.exports = router;
