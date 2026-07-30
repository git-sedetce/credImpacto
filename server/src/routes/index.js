const express = require("express");
const questionario = require("./questionarioRoutes");
const cadastro = require("./cadastroRoutes");

module.exports = (app) => {
  app.use(
    express.json(),
    express.urlencoded({ extended: false }),
    questionario,
    cadastro,
  );
};
