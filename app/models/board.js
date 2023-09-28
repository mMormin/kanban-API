const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Board extends Model {}

Board.init(
  {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "title cannot be empty" },
        notNull: { msg: "title cannot be NULL" },
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "Board",
    tableName: "board",
  }
);

module.exports = Board;
