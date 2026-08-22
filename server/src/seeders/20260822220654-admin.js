"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Agentes",
      [
        {
          nome: "Admin Adece",
          cpf: "25172115315",
          telefone: "8531082700",
          email: "adece@adece.ce.gov.br",
          password: "$2b$10$cY6VPY8Ny6uqRgrX2d/YzeUc33reAVNF.NdQ16CM0wn2DCVxgTlQ6",
          user_active: true,
          user_pin: "335638",
          profile_id: 1,
          cep: "60811341",
          cidade: 59,
          bairro: "Gurarapes",
          rua: "Avenida Washington Soares",
          numero: "999",
          complemento: "Pavilhão Leste - Portão D - Mezanino 2",
          createdAt: new Date (),
          updatedAt: new Date ()
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Agentes', null, {});
  },
};
