const express = require("express");
const { Router } = express;
const EmpresaControllers = require("../controllers/EmpresaControllers.js");

const router = Router();

router.get("/companie/:cnpj", EmpresaControllers.pegarsEmpresa);

module.exports = router;