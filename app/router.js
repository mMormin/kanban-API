const { Router } = require("express");

const mainController = require("./controllers/boardController");

const router = Router();

// Boards
router.get("/boards", boardController, getAllBoards);
router.get("/boards/:id", boardController, getOneBoard);
router.post("/boards", boardController, newBoard);
router.patch("/boards/:id", boardController, updateBoard);
router.delete("/boards/:id", boardController, deleteBoard);

// Cards
router.get("cards", cardController, getAllCards);
router.get("cards/:id", cardController, getOneCard);
router.post("/cards", cardController, newCard);
router.patch("/cards/:id", cardController, updateCard);
router.delete("/cards/:id", cardController, deleteCard);

// Todos
router.get("todos", todoController, getAllTodos);
router.get("todos/:id", todoController, getOneTodo);
router.post("/todos/:id", todoController, newTodo);
router.patch("/todos/:id", todoController, updateTodo);
router.delete("/todos/:id", todoController, deleteTodo);

// Tags
router.get("/tags", tagController, getAllTags);
router.get("/tags/:id", tagController, getOneTag);
router.post("/tags/:id", tagController, newTag);
router.patch("/tags/:id", tagController, updateTag);
router.delete("/tags/:id", tagController, deleteTag);

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
