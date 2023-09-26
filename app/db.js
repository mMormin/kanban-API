const { Sequelize } = require("sequelize");

const sequelizeConnect = new Sequelize({
  dialect: "postgres",
  define: {
    underscored: true,
  },
  dialectOptions: {
    client_encoding: "UTF8",
  },
});

module.exports = sequelizeConnect;
