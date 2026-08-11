'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cadastros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipo_proponente: {
        type: Sequelize.STRING
      },
      nome_responsavel: {
        type: Sequelize.STRING
      },
      cpf: {
        type: Sequelize.STRING,
        unique: true
      },
      telefone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      cnpj: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        unique: true
      },
      user_active: {
        type: Sequelize.BOOLEAN
      },
      user_pin: {
        type: Sequelize.STRING(6),
        allowNull: false,
      },
      profile_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Profiles', key: 'id' }
      },
      nome_empreendimento: {
        type: Sequelize.STRING
      },
      cep: {
        type: Sequelize.STRING
      },
      cidade: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Cidades', key: 'id' }
      },
      bairro: {
        type: Sequelize.STRING
      },
      rua: {
        type: Sequelize.STRING
      },
      numero: {
        type: Sequelize.STRING
      },
      complemento: {
        type: Sequelize.STRING
      },
      linha_credito: {
        type: Sequelize.STRING
      },
      iniciativa_impacto: {
        type: Sequelize.STRING
      },
      cadastro_cadimpacto: {
        type: Sequelize.STRING
      },
      status_atual: {
        type: Sequelize.STRING
      },
      area_atuacao: {
        type: Sequelize.STRING
      },
      resumo_negocio: {
        type: Sequelize.STRING(1500)
      },
      aceite_termos: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cadastros');
  }
};