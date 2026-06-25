'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Alternativas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pergunta_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Perguntas', key: 'id' }
      },
      descricao: {
        type: Sequelize.STRING(500)
      },
      peso: {
        type: Sequelize.NUMERIC(10,2)
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
    await queryInterface.dropTable('Alternativas');
  }
};