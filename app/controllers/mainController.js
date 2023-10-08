const { Card, Todo, Tag } = require("../models/index");

const mainController = {
  async swapCardsPositions(req, res, next) {
    try {
      const { card_id } = req.params;
      const { swapped_card } = req.query;

      if (!swapped_card || !card_id) {
        return next();
      }

      const card = await Card.findByPk(card_id);
      const isSwappedCard = await Card.findByPk(swapped_card);

      const cardPosition = card.position;
      card.position = isSwappedCard.position;
      isSwappedCard.position = cardPosition;

      await card.save();
      await isSwappedCard.save();

    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async swapTodosPositions(req, res, next) {
    try {
      const { todo_id } = req.params;
      const { swapped_todo } = req.query;

      if (!swapped_todo || !todo_id) {
        return next();
      }

      const todo = await Todo.findByPk(todo_id);
      const isSwappedTodo = await Todo.findByPk(swapped_todo);

      const todoPosition = todo.position;
      todo.position = isSwappedTodo.position;
      isSwappedTodo.position = todoPosition;

      await todo.save();
      await isSwappedTodo.save();

    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async postNewTodoHasTag(req, res, next) {
    try {
      const { id } = req.params;
      const userInput = req.body;

      const todo = await Todo.findByPk(id);

      const tag = await Tag.findOne({ where: userInput });

      if (!todo || !tag) {
        return next();
      }

      await todo.addTag(tag);

      return res.json(todo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getAllTagsByTodoPk(req, res, next) {
    try {
      const { id } = req.params;

      const todo = await Todo.findByPk(id);

      const tags = await Tag.findAll();

      if (!cards.length) {
        return next();
      }

      return res.json(cards);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async deleteTodoHasTag(req, res, next) {
    try {
      const { todo_id, tag_id } = req.params;

      const todo = await Todo.findByPk(todo_id);

      const tag = await Tag.findByPk(tag_id);

      if (!todo || !tag) {
        return next();
      }

      await todo.removeTag(tag);

      return res.json(todo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  notFound(_, res) {
    res.status(404).json({ error: "Resource not found" });
  },
};

module.exports = mainController;
