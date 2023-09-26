const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.js");

class Tag extends Model {}

Tag.init(
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    color: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: "#FFF",
    },
  },
  {
    sequelize,
    modelName: "Tag",
    tableName: "tag",
  }
);

module.exports = Tag;
