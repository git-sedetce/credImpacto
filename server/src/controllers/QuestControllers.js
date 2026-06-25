const database = require("../models");

class QuestControllers {
  static async criarPergunta(req, res) {
    const { questionario_id, descricao, ordem, alternativas } = req.body;

    const transaction = await database.sequelize.transaction();

    try {
      const pergunta = await database.perguntas.create(
        {
          questionario_id,
          descricao,
          ordem,
        },
        { transaction },
      );

      for (const alternativa of alternativas) {
        await database.alternativas.create(
          {
            pergunta_id: pergunta.id,
            descricao: alternativa.descricao,
            peso: alternativa.peso,
          },
          { transaction },
        );
      }

      await transaction.commit();

      return res.status(201).json({
        mensagem: "Pergunta criada com sucesso",
        perguntaId: pergunta.id,
      });
    } catch (error) {
      await transaction.rollback();

      return res.status(500).json({
        erro: error.message,
      });
    }
  }

  static async listarPerguntas(req, res) {
    const { questionario_id } = req.params;

    try {
      const perguntas = await database.perguntas.findAll({
        where: {
          questionario_id,
        },
        include: [
          {
            model: database.alternativas,
          },
        ],
        order: [["ordem", "ASC"]],
      });

      return res.status(200).json(perguntas);
    } catch (error) {
      return res.status(500).json({
        erro: error.message,
      });
    }
  }

  static async buscarPergunta(req, res) {

    const { id } = req.params;

    try {

        const pergunta =
            await database.perguntas.findByPk(id, {
                include: [
                    {
                        model: database.alternativas
                    }
                ]
            });

        if (!pergunta) {
            return res.status(404).json({
                mensagem: 'Pergunta não encontrada'
            });
        }

        return res.status(200).json(pergunta);

    } catch (error) {

        return res.status(500).json({
            erro: error.message
        });
    }
}

  static async listarQuestionario(req, res) {
    try {
      const questionario = await database.questionario.findByPk(1, {
        include: [
          {
            model: database.pergunta,
            include: [database.alternativa],
          },
        ],
      });

      return res.status(200).json(questionario);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async responder(req, res) {
    const { usuario_id, questionario_id, respostas } = req.body;

    try {
      let pontuacaoTotal = 0;

      const respostaCabecalho = await database.respostas_questionario.create({
        usuario_id,
        questionario_id,
      });

      for (const item of respostas) {
        const alternativa = await database.alternativas.findByPk(
          item.alternativa_id,
        );

        pontuacaoTotal += Number(alternativa.peso);

        await database.respostas_itens.create({
          resposta_questionario_id: respostaCabecalho.id,
          pergunta_id: item.pergunta_id,
          alternativa_id: item.alternativa_id,
          peso: alternativa.peso,
        });
      }

      await respostaCabecalho.update({
        pontuacao_total: pontuacaoTotal,
      });

      return res.status(200).json({
        mensagem: "Questionário respondido",
        pontuacaoTotal,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async atualizarPergunta(req, res) {

    const { id } = req.params;

    const {
        descricao,
        ordem,
        alternativas
    } = req.body;

    const transaction =
        await database.sequelize.transaction();

    try {

        const pergunta =
            await database.perguntas.findByPk(id);

        if (!pergunta) {

            await transaction.rollback();

            return res.status(404).json({
                mensagem: 'Pergunta não encontrada'
            });
        }

        await pergunta.update(
            {
                descricao,
                ordem
            },
            { transaction }
        );

        await database.alternativas.destroy({
            where: {
                pergunta_id: id
            },
            transaction
        });

        for (const alternativa of alternativas) {

            await database.alternativas.create(
                {
                    pergunta_id: id,
                    descricao: alternativa.descricao,
                    peso: alternativa.peso
                },
                { transaction }
            );
        }

        await transaction.commit();

        return res.status(200).json({
            mensagem: 'Pergunta atualizada com sucesso'
        });

    } catch (error) {

        await transaction.rollback();

        return res.status(500).json({
            erro: error.message
        });
    }
}

static async excluirPergunta(req, res) {

    const { id } = req.params;

    const transaction =
        await database.sequelize.transaction();

    try {

        await database.alternativas.destroy({
            where: {
                pergunta_id: id
            },
            transaction
        });

        await database.perguntas.destroy({
            where: {
                id
            },
            transaction
        });

        await transaction.commit();

        return res.status(200).json({
            mensagem: 'Pergunta removida com sucesso'
        });

    } catch (error) {

        await transaction.rollback();

        return res.status(500).json({
            erro: error.message
        });
    }
}
}

module.exports = QuestControllers;
