const database = require("../models");
const { Op, Sequelize, where } = require("sequelize");
const fs = require("fs");
const path = require("path");

class CadastroControllers {
  static async registerAgroCompleto(req, res) {
    const t = await database.sequelize.transaction();

    try {
      // ===== 1. VALIDAR ARQUIVOS =====
      if (!req.files?.cpf || !req.files?.residencia) {
        return res.status(400).json({
          message: "CPF/CNPJ e comprovante de residência são obrigatórios",
        });
      }

      // ===== 2. DADOS =====
      const dados = JSON.parse(req.body.dados);

      // ===== 3. CRIAR AGRICULTOR =====
      const novoProdutor = await database.produtor_rural.create(dados, {
        transaction: t,
      });

      const numeroPedido = `PED-${String(novoProdutor.id).padStart(6, "0")}`;
      await novoProdutor.update({ pedido: numeroPedido }, { transaction: t });

      // ===== 4. PROCESSAR ARQUIVOS =====
      const arquivos = [
        {
          file: req.files.cpf[0],
          tipo_anexo: "comprovante_cpf_cnpj",
        },
        {
          file: req.files.residencia[0],
          tipo_anexo: "comprovante_residencia",
        },
      ];

      const tiposPermitidos = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ];

      for (const item of arquivos) {
        if (!tiposPermitidos.includes(item.file.mimetype)) {
          throw new Error("Tipo de arquivo não permitido");
        }

        const caminho = item.file.path.split(process.env.SPLIT)[1];

        await database.anexo.create(
          {
            mimetype: item.file.mimetype,
            filename: item.file.filename,
            path: caminho,
            agricultor_id: novoProdutor.id,
            tipo_anexo: item.tipo_anexo,
          },
          { transaction: t },
        );
      }

      // ===== 5. COMMIT =====
      await t.commit();

      return res.status(200).json(novoProdutor);
    } catch (error) {
      await t.rollback();
      return res.status(500).json({ message: error.message });
    }
  }

  static async pegaCidades(req, res) {
    try {
      const cidadesFiltradas = await database.Cidades.findAll({
        order: [["nome_municipio", "ASC"]],
        attributes: ["id", "nome_municipio"],
      });

      return res.status(200).json(cidadesFiltradas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaRegiao(req, res) {
    try {
      const regioesFiltradas = await database.Regiao.findAll({
        order: [["nome", "ASC"]],
        attributes: ["id", "nome"],
      });

      return res.status(200).json(regioesFiltradas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = CadastroControllers;
