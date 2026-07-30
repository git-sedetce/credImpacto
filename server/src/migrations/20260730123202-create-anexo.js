'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Anexos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cadastro_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Cadastros', key: 'id'}
      },
      tipo_anexo: {
        type: Sequelize.STRING
      },
      mimetype: {
        type: Sequelize.STRING
      },
      filename: {
        type: Sequelize.STRING
      },
      path: {
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
    await queryInterface.dropTable('Anexos');
  }
};