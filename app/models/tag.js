const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.js");

class Tag extends Model {}

Tag.init(
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "name cannot be empty" },
        notNull: { msg: "name cannot be NULL" },
      },
    },
    color: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: "#FFF",
      validate: {
        notNull: { msg: "color cannot be NULL" },
        notEmpty: { msg: "color cannot be empty" },
      }
    },
  },
  {
    sequelize,
    modelName: "Tag",
    tableName: "tag",
  }
);

module.exports = Tag;
