const database = require("../models");
const { Op, Sequelize, where } = require("sequelize");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const baseUrl = process.cwd() + "/src"; //__dirname + '.

class CadastroControllers {
  static async registerCompleto(req, res) {
    const t = await database.sequelize.transaction();

    try {
      /*====================================================
      LIMITES E TIPOS PERMITIDOS
    ====================================================*/

      const LIMITE_RG = 2 * 1024 * 1024; // 2 MB
      const LIMITE_CNPJ = 2 * 1024 * 1024; // 2 MB
      const LIMITE_FOTOS = 5 * 1024 * 1024; // 5 MB

      const TIPOS_PERMITIDOS = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ];

      /*====================================================
      1 - VALIDAR ARQUIVOS OBRIGATÓRIOS
    ====================================================*/

      if (!req.files?.rgFile || !req.files?.cnpjFile) {
        return res.status(400).json({
          message: "RG e Cartão CNPJ são obrigatórios.",
        });
      }

      /*====================================================
      2 - DADOS DO CADASTRO
    ====================================================*/

      const dados = JSON.parse(req.body.dados);
      const salt = await bcrypt.genSalt(10);
      dados.password = await bcrypt.hash(dados.password, salt);
      dados.user_pin = crypto.randomInt(100000, 1000000).toString();
      dados.user_active = false;

      delete dados.rg;
      delete dados.cartaoCnpj;
      delete dados.fotos;

      /*====================================================
      3 - MONTAR LISTA DE ARQUIVOS
    ====================================================*/

      const arquivos = [];

      arquivos.push({
        file: req.files.rgFile[0],
        tipo_anexo: "RG",
        limite: LIMITE_RG,
      });

      arquivos.push({
        file: req.files.cnpjFile[0],
        tipo_anexo: "CARTAO_CNPJ",
        limite: LIMITE_CNPJ,
      });

      if (req.files.fotos) {
        req.files.fotos.forEach((foto) => {
          arquivos.push({
            file: foto,
            tipo_anexo: "FOTO",
          });
        });
      }

      /*====================================================
      4 - VALIDAR TAMANHO DO RG
    ====================================================*/

      if (req.files.rgFile[0].size > LIMITE_RG) {
        throw new Error("O arquivo do RG deve possuir no máximo 2 MB.");
      }

      /*====================================================
      5 - VALIDAR TAMANHO DO CARTÃO CNPJ
    ====================================================*/

      if (req.files.cnpjFile[0].size > LIMITE_CNPJ) {
        throw new Error("O Cartão CNPJ deve possuir no máximo 2 MB.");
      }

      /*====================================================
      6 - VALIDAR TAMANHO TOTAL DAS FOTOS
    ====================================================*/

      if (req.files.fotos) {
        const tamanhoTotalFotos = req.files.fotos.reduce(
          (total, foto) => total + foto.size,
          0,
        );

        if (tamanhoTotalFotos > LIMITE_FOTOS) {
          throw new Error("O conjunto das fotos deve possuir no máximo 5 MB.");
        }
      }

      /*====================================================
      7 - VALIDAR TIPOS DOS ARQUIVOS
    ====================================================*/

      for (const item of arquivos) {
        if (!TIPOS_PERMITIDOS.includes(item.file.mimetype)) {
          throw new Error(
            `O arquivo "${item.file.originalname}" possui um formato inválido.`,
          );
        }
      }

      /*====================================================
      8 - CRIAR CADASTRO
    ====================================================*/

      const novoCadastro = await database.Cadastro.create(dados, {
        transaction: t,
      });

      // Remove a senha antes de responder
      const { password, ...data } = novoCadastro.toJSON();

      /*====================================================
      9 - GRAVAR ANEXOS
    ====================================================*/

      for (const item of arquivos) {
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

      /*====================================================
      10 - COMMIT
    ====================================================*/

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

  static async pegarPerfis(req, res) {
    try {
      const getProfiles = await database.Profile.findAll({
        attributes: [
          "id",
          "perfil"
        ],        
      });

      return res.status(200).json(getProfiles);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar empresa" });
    }
  }

  static async empresaId(req, res) {
    const { id } = req.params;
    try {
      const getCompanie = await database.Cadastro.findOne({
        where: { id: Number(id) },
        attributes: [
          "id",
          "tipo_proponente",
          "nome_responsavel",
          "cpf",
          "telefone",
          "email",
          "cnpj",
          "nome_empreendimento",
          "cep",
          "cidade",
          "bairro",
          "rua",
          "numero",
          "complemento",
          "iniciativa_impacto",
          "cadastro_cadimpacto",
          "status_atual",
          "area_atuacao",
          "resumo_negocio",
          "aceite_termos",
        ],
        include: [
          {
            association: "ass_cadastro_cidade",
            attributes: ["id", "nome_municipio"],
            include: [
              {
                association: "ass_municipio_regiao",
                attributes: ["id", "nome"],
              },
            ],
          },
        ],
      });

      return res.status(200).json(getCompanie);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar empresa" });
    }
  }

  static async pegarImagensId(req, res) {
    const { id } = req.params;

    try {
      const anexos = await database.Anexo.findAll({
        where: {
          cadastro_id: Number(id),
        },
        attributes: ["id", "tipo_anexo", "mimetype", "filename", "path"],
        order: [["id", "ASC"]],
      });

      const mostraAnexos = anexos.map((anexo) => {
        const dadosAnexo = anexo.toJSON();

        dadosAnexo.path = `${req.protocol}://${req.get("host")}${dadosAnexo.path}`;

        return dadosAnexo;
      });

      return res.status(200).json(mostraAnexos);
    } catch (error) {
      console.error("Erro ao buscar anexos:", error);

      return res.status(500).json({
        message: error.message,
      });
    }
  }

  static async pegarTodasEmpresas(req, res) {
    try {
      const getCompanies = await database.Cadastro.findAll({
        where: { linha_credito: "CredImpacto" },
        attributes: [
          "id",
          "tipo_proponente",
          "nome_responsavel",
          "nome_empreendimento",
          "iniciativa_impacto",
          "area_atuacao",
        ],
        include: [
          {
            association: "ass_cadastro_cidade",
            attributes: ["id", "nome_municipio"],
            include: [
              {
                association: "ass_municipio_regiao",
                attributes: ["id", "nome"],
              },
            ],
          },
        ],
      });

      return res.status(200).json(getCompanies);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar empresa" });
    }
  }

  static async atualizarEmpresa(req, res) {
    const { id } = req.params;
    const dados = req.body;

    try {
      const empresa = await database.Cadastro.findByPk(Number(id));
      if (!empresa) {
        return res.status(404).json({ message: "Empresa não encontrada." });
      }
      await database.Cadastro.update(dados, { where: { id: Number(id) } });
      const empresaAtualizada = await database.Cadastro.findByPk(Number(id));
      return res.status(200).json({
        message: "Empresa atualizada com sucesso.",
        empresa: empresaAtualizada,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar empresa." });
    }
  }

  static async alterarAnexo(req, res) {
    const { id } = req.params;
    try {
      const anexo = await database.Anexo.findByPk(id);
      if (!anexo) {
        return res.status(404).json({
          message: "Anexo não encontrado.",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message: "Nenhum arquivo enviado.",
        });
      }

      // Remover arquivo antigo
      // fs.unlinkSync(anexo.path);

      await anexo.update({
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        path: req.file.path,
      });

      return res.status(200).json({
        message: "Anexo alterado com sucesso.",
        anexo,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Erro ao alterar anexo.",
      });
    }
  }

  static async excluirAnexo(req, res) {
    const { id } = req.params;
    try {
      const anexo = await database.Anexo.findByPk(id);
      if (!anexo) {
        return res.status(404).json({
          message: "Anexo não encontrado.",
        });
      }

      // excluir arquivo físico
      // fs.unlinkSync(anexo.path);

      await anexo.destroy();

      return res.status(200).json({
        message: "Anexo excluído com sucesso.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Erro ao excluir anexo.",
      });
    }
  }
  
}

module.exports = CadastroControllers;
