const express = require("express");

const mainController = require("./controllers/mainController");
const boardController = require("./controllers/boardController");
const cardController = require("./controllers/cardController");
const todoController = require("./controllers/todoController");
const tagController = require("./controllers/tagController");

const router = express.Router();

// Boards
router
  .route("/boards")
  .get(boardController.getAllBoards)
  .post(boardController.createNewBoard)
  .delete(boardController.deleteAllBoards);
router
  .route("/boards/:id(\\d+)")
  .get(boardController.getOneBoardByPk)
  .patch(boardController.updateBoard)
  .delete(boardController.deleteOneBoard);

// Cards
router
  .route("/cards")
  .get(cardController.getAllCards)
  .delete(cardController.deleteAllCards);
// /card/id
router
  .route("/cards/:id(\\d+)")
  .get(cardController.getOneCardByPk)
  .delete(cardController.deleteOneCard);
// boards/:id/cards
router
  .route("/boards/:board_id(\\d+)/cards")
  .get(cardController.getAllCardsWithTodos)
  .post(cardController.postNewCard)
  .delete(cardController.deleteAllCardsByBoard);

// boards/:id/cards/:id
router
  .route("/boards/:board_id(\\d+)/cards/:card_id(\\d+)")
  .get(cardController.getOneCardWithTodosByPk)
  .patch((req, res, next) => {
    if (req.query.swapped_card) {
      // boards/:id/cards/:id?swapped_card=:id
      return mainController.swapCardsPositions(req, res, next);
    } else {
      // boards/:id/cards/:id
      return cardController.updateCard(req, res, next);
    }
  })
  .delete(cardController.deleteOneCard);

// Todos
router.route("/todos").get(todoController.getAllTodos);
// todos/:id
router
  .route("/todos/:id(\\d+)")
  .get(todoController.getOneTodoByPk)
  .patch(todoController.updateTodo)
  .delete(todoController.deleteOneTodo);
// boards/:id/cards/:id/todos
router
  .route("/boards/:board_id(\\d+)/cards/:card_id(\\d+)/todos")
  .post(todoController.createNewTodoByCard)
  .get(todoController.getAllTodosByCardPk)
  .delete(todoController.deleteAllTodosByCard);
// boards/:id/cards/:id/todos/:id
router
  .route("/boards/:board_id(\\d+)/cards/:card_id(\\d+)/todos/:todo_id(\\d+)")
  .post(todoController.createNewTodoByCard)
  .patch((req, res, next) => {
    if (req.query.swapped_todo) {
      // boards/:id/cards/:id/todos/:id?swapped_todo=:id
      return mainController.swapTodosPositions(req, res, next);
    } else {
      // boards/:id/cards/:id/todos/:id
      return todoController.updateTodoByCard(req, res, next);
    }
  })
  .delete(todoController.deleteTodoByCard);

// Tags
router
  .route("/tags")
  .get(tagController.getAllTags)
  .post(tagController.createNewTag);
// tags/:id
router
  .route("/tags/:id(\\d+)")
  .get(tagController.getOneTagByPk)
  .patch(tagController.updateTag)
  .delete(tagController.deleteOneTag);
// boards/:id/cards/:id/todos/:id/tags
router
  .route("/boards/:board_id(\\d+)/cards/:card_id/todos/:id(\\d+)/tags")
  .get(tagController.getAllTagsByCardPk)
  .post(mainController.postNewTodoHasTag);
// boards/:id/cards/:id/todos/:id/tags/:id
router
  .route(
    "/boards/:board_id/cards/:card_id/todos/:todo_id(\\d+)/tag/:tag_id(\\d+)"
  )
  .delete(mainController.deleteTodoHasTag);

// Undefined path
router.use(mainController.notFound);

module.exports = router;
