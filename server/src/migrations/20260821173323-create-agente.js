'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Agentes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      cpf: {
        type: Sequelize.STRING
      },
      telefone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Agentes');
  }
};