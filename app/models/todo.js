const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Todo extends Model {}

Todo.init(
  {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Todo",
    tableName: "todo",
  }
);

module.exports = Todo;
