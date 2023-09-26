const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.js");

class Member extends Model {}

Member.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^*-]).{8,}$/i, // 8 chars containing at least 1 uppC && 1 lowC && 1 spec from (#?!@$%^*-) && 1 digit
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "member",
    }
  },
  {
    sequelize,
    modelName: "Member",
    tableName: "Member",
  }
);


module.exports = Member;
