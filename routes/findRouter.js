const { Router } = require("express");
const { check } = require("express-validator");
const { findAll } = require("../controllers/findController");


const router = Router();

router.get('/:collection/:terms', findAll )

module.exports = router;