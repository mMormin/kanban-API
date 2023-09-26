const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Todo extends Model {}

Todo.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    color: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "Todo",
    tableName: "Todo",
  }
);

module.exports = Todo;
