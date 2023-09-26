require("dotenv").config();
const sequelize = require("./app/db.js");
const port = process.env.PORT;

// Deps Imports
const express = require("express");
const router = require("./app/router");

// Express Initialization
const app = express();
app.set("view engine", "ejs");
app.set("views", "app/views");
app.use(express.static("public"));

// Init for POST requests
app.use(express.urlencoded({ extended: true }));

// Router Initialization
app.use(router);

// Server Initialization and Database Connexion Check
const serverStart = async () => {
  try {
    await sequelize.authenticate();
    console.log("🗃️  Database connection ✅");
    app.listen(port, () => {
      console.log(`📡 Listening on localhost URL : http://localhost:${port}`);
    });
  } catch (error) {
    console.error("🗃️  Database connexion ❌ :", error);
  }
};

serverStart();

/*
// Force tables creation
const tablesCreation = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("🗃️  Models synchronization ✅");
  } catch (error) {
    console.error("🗃️  Models synchronization ❌ :", error);
  }
};
tablesCreation();
*/
