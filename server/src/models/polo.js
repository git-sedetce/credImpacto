'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Polo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Polo.belongsTo(models.Cidades, { foreignKey: 'cidade', as: 'ass_polo_cidade' })
      Polo.belongsTo(models.Bairro, { foreignKey: 'bairro_id', as: 'ass_polo_bairro' })
      Polo.hasOne(models.Agente, { foreignKey: 'polo_id', as: 'ass_polo_agente' })
    }
  }
  Polo.init({
    nome_polo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Polo',
  });
  return Polo;
};