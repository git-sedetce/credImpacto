'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Respostas_Itens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      resposta_questionario_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Respostas_Questionarios', key: 'id' }
      },
      pergunta_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Perguntas', key: 'id' }
      },
      alternativa_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Alternativas', key: 'id' }
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
    await queryInterface.dropTable('Respostas_Itens');
  }
};