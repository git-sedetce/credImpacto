const { Router } = require("express");
const CadastroController = require("../controllers/CadastroControllers.js");
// var auth = require('../service/AutenticaService');
// var checkRole = require('../service/checkRole');
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pastaUploads = path.join(__dirname, "../uploads/anexos");
    verificarECriarPasta(pastaUploads);
    cb(null, pastaUploads);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_adece_" + "economia_impacto_" + file.originalname);
  },
});

// Função para verificar se a pasta existe e criar se não existir
function verificarECriarPasta(pastaPath) {
  if (!fs.existsSync(pastaPath)) {
    fs.mkdirSync(pastaPath, { recursive: true });
    console.log(`A pasta ${pastaPath} foi criada.`);
  } else {
    console.log(`A pasta ${pastaPath} já existe.`);
  }
}

const upload = multer({ storage });

const router = Router();
router.post(
  "/registerCompleto",
  upload.fields([
    { name: "cpf", maxCount: 1 },
    { name: "residencia", maxCount: 1 },
  ]),
  CadastroController.registerAgroCompleto,
);
router.get("/takecitys", CadastroController.pegaCidades);
router.get("/takeregion", CadastroController.pegaRegiao);

module.exports = router;
