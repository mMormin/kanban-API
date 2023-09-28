const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Todo extends Model {}

Todo.init(
  {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "title cannot be empty" },
        notNull: { msg: "title cannot be NULL" },
      },
    },
    position: {
      type: DataTypes.INTEGER,
      isInt: { msg: "Invalid type: position should be a number" },
    },
  },
  {
    sequelize,
    modelName: "Todo",
    tableName: "todo",
  }
);

module.exports = Todo;
