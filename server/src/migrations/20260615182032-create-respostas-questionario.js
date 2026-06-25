'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Respostas_Questionarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      questionario_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Questionarios', key: 'id' }
      },
      data_resposta: {
        type: Sequelize.DATEONLY
      },
      pontuacao_total: {
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
    await queryInterface.dropTable('Respostas_Questionarios');
  }
};