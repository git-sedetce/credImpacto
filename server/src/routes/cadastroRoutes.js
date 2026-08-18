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
router.post("/registerCompleto", upload.fields([
    { name: "rgFile", maxCount: 1 },
    { name: "cnpjFile", maxCount: 1 },
    { name: "fotos", maxCount: 20 },
  ]),
  CadastroController.registerCompleto,
);
router.get("/takecitys", CadastroController.pegaCidades);
router.get("/takeregion", CadastroController.pegaRegiao);
router.get("/consultacpf/:cpf", CadastroController.consultaCPF);
router.get("/consultacnpj/:cnpj", CadastroController.consultaCNPJ);
router.get("/consultaemail/:email", CadastroController.consultaEmail);
router.get("/companiebyid/:id", CadastroController.empresaId);
router.get('/imagens/:id', CadastroController.pegarImagensId);
router.get('/allcompanies', CadastroController.pegarTodasEmpresas);
router.put('/updatecompanie/:id', CadastroController.atualizarEmpresa);

router.put('/anexos/:id', CadastroController.alterarAnexo);
router.delete('/anexos/:id', CadastroController.excluirAnexo);

module.exports = router;
