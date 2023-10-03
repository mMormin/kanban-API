const express = require('express');

const mainController = require("./controllers/mainController");
const boardController = require("./controllers/boardController");
const cardController = require("./controllers/cardController");
const todoController = require("./controllers/todoController");
const tagController = require("./controllers/tagController");

const router = express.Router();

// Main Routes
// boards/:id/cards
router.route("/boards/:board_id(\\d+)/cards").get(mainController.getAllCardsByBoard).post(mainController.createNewCardFromBoard).delete(mainController.deleteAllCardsByBoard);
// boards/:id/cards/:id
router.route("/boards/:board_id(\\d+)/cards/:card_id(\\d+)").get(mainController.getOneCardByBoard);
// boards/:id/cards/:id/todos
router.route("/boards/:board_id(\\d+)/cards/:card_id(\\d+)/todos").post(mainController.createNewTodoByCard).get(mainController.getAllTodosByCard).delete(mainController.deleteAllTodosByCard);
// boards/:id/cards/:id/todos/:id
router.route("/boards/:board_id(\\d+)/cards/:card_id(\\d+)/todos/:todo_id").post(mainController.createNewTodoByCard).patch(mainController.updateTodoByCard).delete(mainController.deleteTodoByCard);
router.route("/boards/:board_id(\\d+)/cards/:card_id/todos/:id(\\d+)/tag").post(mainController.CreateNewTodoHasTag);
router.route("/boards/:board_id/cards/:card_id/todos/:todo_id(\\d+)/tag/:tag_id(\\d+)").delete(mainController.deleteTodoHasTag);

// Boards
router.route("/boards").get(boardController.getAllBoards).post(boardController.createNewBoard).delete(boardController.deleteAllBoards);
router.route("/boards/:id(\\d+)").get(boardController.getOneBoardByPk).patch(boardController.updateBoard).delete(boardController.deleteOneBoard);

// Cards
router.route("/cards").get(cardController.getAllCards).post(cardController.createNewCard).delete(cardController.deleteAllCards);
router.route("/cards/:id(\\d+)").get(cardController.getOneCardByPk).patch(cardController.updateCard).delete(cardController.deleteOneCard);

// Todos
router.route("/todos").get(todoController.getAllTodos).post(todoController.createNewTodo)
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
