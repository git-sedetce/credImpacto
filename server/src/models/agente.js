'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Agente.init({
    nome: DataTypes.STRING,
    cpf: DataTypes.STRING,
    telefone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    user_active: DataTypes.BOOLEAN,
    user_pin: DataTypes.STRING,
    profile_id: DataTypes.INTEGER,
    cep: DataTypes.STRING,
    cidade: DataTypes.INTEGER,
    bairro: DataTypes.STRING,
    rua: DataTypes.STRING,
    numero: DataTypes.STRING,
    complemento: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Agente',
  });
  return Agente;
};