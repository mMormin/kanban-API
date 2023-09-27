const express = require('express');

const mainController = require("./controllers/mainController");
const boardController = require("./controllers/boardController");
const cardController = require("./controllers/cardController");
const todoController = require("./controllers/todoController");
const tagController = require("./controllers/tagController");

const router = express.Router();

// Boards
router.route("/boards").get(boardController.getAllBoards).post(boardController.createNewBoard).delete(boardController.deleteAllBoards);
router.route("/boards/:id(\\d+)").get(boardController.getOneBoardByPk).patch(boardController.updateBoard).delete(boardController.deleteOneBoard);

// Cards
router.route("/cards").get(cardController.getAllCards).post(cardController.createNewCard).delete(cardController.deleteAllCards);
router.route("/cards/:id(\\d+)").get(cardController.getOneCardByPk).patch(cardController.updateCard).delete(cardController.deleteOneCard);

// Todos
router.route("/todos").get(todoController.getAllTodos).post(todoController.createNewTodo);
router.route("/todos/:id(\\d+)").get(todoController.getOneTodoByPk).patch(todoController.updateTodo).delete(todoController.deleteOneTodo);

// Tags
router.route("/tags").get(tagController.getAllTags).post(tagController.createNewTag);
router.route("/tags/:id(\\d+)").get(tagController.getOneTagByPk).patch(tagController.updateTag).delete(tagController.deleteOneTag);


// Signup
// router.get("/signup");
// router.post("/signup");

// Login
// router.get("/login");
// router.post("/login");
// router.get("/logout");

// Undefined path
router.use(mainController.notFound);

module.exports = router;
