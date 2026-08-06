'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Profiles', [
    {
      perfil: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      perfil: 'Gestão',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      perfil: 'Suporte',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      perfil: 'Supervisão',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      perfil: 'Agente de Território',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      perfil: 'Conformidade',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      perfil: 'Cliente',
      createdAt: new Date(),
      updatedAt: new Date()
     }
  ], {});    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles', null, {});
  }
};
