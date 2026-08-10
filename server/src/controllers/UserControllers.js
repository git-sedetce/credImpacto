const database = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
const crypto = require("crypto");

class UserController {
  static async gerarPin(req, res) {
    const user = req.body;

    try {
      // Verifica se foi informado email ou CPF
      if (!user.email && !user.cpf) {
        return res.status(400).json({
          message: "Informe o e-mail ou CPF.",
        });
      }

      // Monta as condições da consulta
      const condicoes = [];

      if (user.email) {
        condicoes.push({
          email: user.email,
        });
      }

      if (user.cpf) {
        condicoes.push({
          cpf: user.cpf,
        });
      }

      // Procura o usuário por email OU CPF
      const verificaUser = await database.Cadastro.findOne({
        where: {
          [Op.or]: condicoes,
        },
      });

      if (!verificaUser) {
        return res.status(404).json({
          message: "Usuário não encontrado!",
        });
      }

      // Gera PIN de 6 dígitos
      const newPin = crypto.randomInt(100000, 1000000).toString();

      // Atualiza o PIN do usuário encontrado
      await database.Cadastro.update(
        {
          user_pin: newPin,
        },
        {
          where: {
            id: verificaUser.id,
          },
        },
      );

      // Envia o email para o email cadastrado
      const transporter = nodemailer.createTransport({
        host: "172.26.2.26",
        port: 25,
        secure: false,
        tls: {
          rejectUnauthorized: false,
        },
      });

      const mailOptions = {
        from: "cotec@sde.ce.gov.br",
        to: verificaUser.email,
        subject: "Novo PIN para nova senha",
        html: `
        <h3>Solicitação de nova senha</h3>

        <p>Seu novo PIN para redefinição de senha é:</p>

        <h2>${newPin}</h2>

        <p>
          Utilize este PIN para criar sua nova senha.
        </p>

        <p>
          <a href="https://cotonicultura.sde.ce.gov.br/resetSenha">
            Resetar Senha
          </a>
        </p>
      `,
      };

      // Envia o email
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error("Erro ao enviar email:", error);
        } else {
          console.log("Email enviado:", info.response);
        }
      });

      return res.status(200).json({
        message: "PIN gerado e enviado com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao gerar PIN:", error);

      return res.status(500).json({
        message: error.message,
      });
    }
  }

  static async login(req, res) {
    const user = req.body;

    try {
      // Verifica se foi informado email ou CPF
      if (!user.email && !user.cpf) {
        return res.status(400).json({
          message: "Informe o e-mail ou CPF.",
        });
      }

      // Monta as condições de busca
      const condicoes = [];

      if (user.email) {
        condicoes.push({
          email: user.email,
        });
      }

      if (user.cpf) {
        condicoes.push({
          cpf: user.cpf,
        });
      }

      // Procura o usuário por email OU CPF
      const verificaUser = await database.Cadastro.findOne({
        where: {
          [Op.or]: condicoes,
        },
      });

      // Usuário não encontrado
      if (!verificaUser) {
        return res.status(404).send({
          message: "Usuário não encontrado!",
        });
      }

      // Verifica se o usuário está ativo
      if (!verificaUser.user_active) {
        return res.status(400).send({
          message: "Consulte o Administrador do sistema",
        });
      }

      // Verifica a senha
      if (!(await bcrypt.compare(user.password, verificaUser.password))) {
        return res.status(400).send({
          message: "Credenciais inválidas!",
        });
      }

      // Gera o token
      const token = jwt.sign(
        {
          _id: verificaUser.id,
          _profile_id: verificaUser.profile_id,
          _user_name: verificaUser.user_name,
        },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "8h",
        },
      );

      return res.json({
        auth: true,
        token: token,
        message: "Usuário logado com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao realizar login:", error);

      return res.status(500).json({
        message: "Problemas ao realizar login!",
      });
    }
  }

  static async pegaUsers(req, res) {
    try {
      const getUser = await database.Cadastro.findAll({
        order: [["nome", "ASC"]],
        attributes: [
          "id",
          "nome_responsavel",
          "tipo_proponente",
          "cpf",
          "telefone",
          "email",
          "cnpj",
          "user_active",
          "user_pin",
          "nome_empreendimento",
          "cep",
          "bairro",
          "rua",
          "numero",
          "complemento",
          "linha_credito",
          "iniciativa_impacto",
          "cadastro_cadimpacto",
          "status_atual",
          "area_atuacao",
          "resumo_negocio",
          "aceite_termos",
          "createdAt",
          "updatedAt",
        ],
        include: [
          {
            association: "ass_cadastro_profile",
            attributes: ["id", "perfil"],
          },
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

      return res.status(200).json(getUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar usuários" });
    }
  }

  static async atualizaUser(req, res) {
    const { id } = req.params;
    const user = req.body;
    // console.log('user', user)
    try {
      await database.Cadastro.update(user, { where: { id: Number(id) } });
      const updateUser = await database.Cadastro.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(updateUser);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async logout(req, res) {
    res.cookie("jwt", "", { maxAge: 0 });
    res.send({ message: "Logout Success!" });
  }

  static async resetPassword(req, res) {
    const user = req.body;
    //console.log('user', user)
    try {
      const verificaUser = await database.Cadastro.findOne({
        where: { email: user.email },
      });
      if (!verificaUser) {
        return res.status(404).send({ message: "Usuário não encontrado!" });
      }
      let newPassword = user.password;
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);
      newPassword = hashedNewPassword;
      //console.log('newPassword', newPassword)

      if (verificaUser.user_active === false) {
        const novaSenha = await database.Cadastro.update(
          { password: newPassword },
          { where: { email: user.email } },
        );
      } else {
        const novaSenha = await database.Cadastro.update(
          { password: newPassword },
          { where: { email: user.email } },
        );
      }

      //const  result = await novaSenha.save()
      //const { password, ...data } = await result.toJSON()
      res.send({ message: "Senha alterada com sucesso!" });
    } catch (error) {
      //res.send(verificaUserEmail)
      return res.status(500).json(error.message);
    }
  }

  static async deletaUsers(req, res) {
    const { id } = req.params;

    const apaga = await database.Cadastro.findOne({
      where: { id: Number(id) },
      attributes: ["nome_responsavel"],
    });

    try {
      await database.Cadastro.destroy({ where: { id: Number(id) } });
      return res.status(200).json({
        mensagem: `O Usuario ${apaga.nome_responsavel} foi excluido com sucesso!!`,
      });
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }
}

module.exports = UserController;
