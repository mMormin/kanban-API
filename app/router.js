const { Router } = require("express");

const mainController = require("./controllers/mainController");

const router = Router();

// Default
router.get("/", mainController.homePage);

// Signup
// router.get("/signup");
// router.post("/signup");

// Login
// router.get("/login");
// router.post("/login");
// router.get("/logout");

// Undefined path
router.use("*", mainController.errorPage);

module.exports = router;
