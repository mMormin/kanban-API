const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Board extends Model {}

Board.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Board",
    tableName: "Board",
  }
);

module.exports = Board;
