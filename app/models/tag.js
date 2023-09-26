const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.js");

class Tag extends Model {}

Tag.init(
  {
    name: {
      type: DataTypes.STRING,
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
    modelName: "Tag",
    tableName: "tag",
  }
);

module.exports = Tag;
