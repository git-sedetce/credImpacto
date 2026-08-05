const database = require("../models");
const { Op, Sequelize, where } = require("sequelize");
const fs = require("fs");
const path = require("path");

class CadastroControllers {
  static async registerCompleto(req, res) {
    
    const t = await database.sequelize.transaction();

    try {
      //----------------------------------------------------
      // 1 - VALIDAR ARQUIVOS
      //----------------------------------------------------

      if (!req.files?.rgFile || !req.files?.cnpjFile) {
        return res.status(400).json({
          message: "RG e Cartão CNPJ são obrigatórios.",
        });
      }

      //----------------------------------------------------
      // 2 - DADOS
      //----------------------------------------------------

      const dados = JSON.parse(req.body.dados);
      // console.log("Dados recebidos (JSON):", dados);

      //----------------------------------------------------
      // 3 - REMOVER CAMPOS QUE NÃO EXISTEM NA TABELA
      //----------------------------------------------------

      delete dados.rg;
      delete dados.cartaoCnpj;
      delete dados.fotos;

      //----------------------------------------------------
      // 4 - CRIAR CADASTRO
      //----------------------------------------------------

      const novoCadastro = await database.Cadastro.create(dados, {
        transaction: t,
      });

      // console.log(novoCadastro.toJSON());

      //----------------------------------------------------
      // 5 - TIPOS PERMITIDOS
      //----------------------------------------------------

      const tiposPermitidos = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ];

      //----------------------------------------------------
      // 6 - MONTAR LISTA DE ARQUIVOS
      //----------------------------------------------------

      const arquivos = [];

      // RG
      arquivos.push({
        file: req.files.rgFile[0],
        tipo_anexo: "RG",
      });

      // Cartão CNPJ
      arquivos.push({
        file: req.files.cnpjFile[0],
        tipo_anexo: "CARTAO_CNPJ",
      });

      // Fotos
      if (req.files.fotos) {
        req.files.fotos.forEach((foto) => {
          arquivos.push({
            file: foto,
            tipo_anexo: "FOTO",
          });
        });
      }

      //----------------------------------------------------
      // 7 - SALVAR ANEXOS
      //----------------------------------------------------

      for (const item of arquivos) {
        if (!tiposPermitidos.includes(item.file.mimetype)) {
          throw new Error(
            `Arquivo ${item.file.originalname} possui formato inválido.`,
          );
        }

        const caminho = item.file.path.split(process.env.SPLIT)[1];

        await database.Anexo.create(
          {
            cadastro_id: novoCadastro.id,
            tipo_anexo: item.tipo_anexo,
            mimetype: item.file.mimetype,
            filename: item.file.filename,
            path: caminho,
          },
          {
            transaction: t,
          },
        );
      }

      //----------------------------------------------------
      // 8 - COMMIT
      //----------------------------------------------------

      await t.commit();

      return res.status(201).json({
        message: "Cadastro realizado com sucesso.",
        cadastro: novoCadastro,
      });
    } catch (error) {
      await t.rollback();

      console.error(error);

      return res.status(500).json({
        message: error.message,
      });
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

  static async consultaCPF(req, res) {
    const { cpf } = req.params;
    try {
      const verificaCPF = await database.Cadastro.findOne({
        where: { cpf: cpf },
        attributes: ["cpf"],
      });
      if (verificaCPF === null) {
        return res
          .status(200)
          .json({ mensagem: `CPF autorizado para cadastro` });
      } else {
        return res.status(200).json({ mensagem: `CPF já cadastrado!` });
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async consultaCNPJ(req, res) {
    const { cnpj } = req.params;
    try {
      const verificaCNPJ = await database.Cadastro.findOne({
        where: { cnpj: cnpj },
        attributes: ["cnpj"],
      });
      if (verificaCNPJ === null) {
        return res
          .status(200)
          .json({ mensagem: `CNPJ autorizado para cadastro` });
      } else {
        return res.status(200).json({ mensagem: `CNPJ já cadastrado!` });
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async consultaEmail(req, res) {
    const { email } = req.params;
    try {
      const verificaEmail = await database.Cadastro.findOne({
        where: { email: email },
        attributes: ["email"],
      });
      if (verificaEmail === null) {
        return res
          .status(200)
          .json({ mensagem: `Email autorizado para cadastro` });
      } else {
        return res.status(200).json({ mensagem: `Email já cadastrado!` });
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = CadastroControllers;
