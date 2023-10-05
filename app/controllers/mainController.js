const { Card, Todo, Tag } = require("../models/index");

const mainController = {
  async updateCardPosition(req, res, next) {
    try {
      const { board_id, card_id } = req.params;
      const { direction } = req.query;

      const cardResult = await Card.update(direction, {
        where: { id: card_id, board_id },
        returning: true,
      });

      const [, [card]] = cardResult;

      if (!direction) {
        return next();
      }

      if (direction === 1) {
        const cards = await Card.findAll({ where: { board_id } });

        for (let i = 0; i < cards.length; i++) {
          direction++;
          let cardsResult = await Card.update(direction, {
            where: { board_id },
            returning: true,
          });

          const [, [cards]] = cardsResult;

          return res.json(card, cards);
        }
      } else {
        const cards = await Card.findAll({ where: { board_id } });

        for (let i = 0; i < cards.length; i++) {
          direction--;
          let cardsResult = await Card.update(direction, {
            where: { board_id },
            returning: true,
          });

          const [, [cards]] = cardsResult;

          return res.json(card, cards);
        }
      }
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
