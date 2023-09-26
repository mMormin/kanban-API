const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Card extends Model {}

Card.init(
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
    hidden: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "FALSE",
    },
    color: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "default",
    },
  },
  {
    sequelize,
    modelName: "Card",
    tableName: "card",
  }
);

module.exports = Card;
