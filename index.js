require("dotenv").config();
const sequelize = require("./app/db.js");
const port = process.env.PORT;

// Deps Imports
const express = require("express");
var cors = require('cors');
const router = require("./app/router");
const multer = require("multer");
const bodyParser = multer();

// Express Initialization
const app = express();

// Cors Initialization
app.use(cors());

// Init for POST requests

app.use(bodyParser.none());
app.use(express.json({strict: false}));
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
