const { Router } = require("express");
const QuestController = require("../controllers/QuestControllers");

const router = Router();
router.post("/listarquestionario", QuestController.listarQuestionario);
router.post("/responder", QuestController.responder);
router.post("/perguntas", QuestController.criarPergunta);
router.get("/perguntas/questionario/:questionario_id", QuestController.listarPerguntas);
router.get("/perguntas/:id", QuestController.buscarPergunta);
router.put("/perguntas/:id", QuestController.atualizarPergunta);
router.delete("/perguntas/:id", QuestController.excluirPergunta);

module.exports = router;
