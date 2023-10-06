const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Card extends Model {}

Card.init(
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
      validate: {
        isInt: { msg: "Invalid type: position should be a number" },
      },
    },
    hidden: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "FALSE",
      validate: {
        notEmpty: { msg: "hidden cannot be empty" },
        notNull: { msg: "hidden cannot be NULL" },
      },
    },
  },
  {
    sequelize,
    modelName: "Card",
    tableName: "card",
  }
);

module.exports = Card;
