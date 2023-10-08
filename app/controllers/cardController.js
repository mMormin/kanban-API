const { Card } = require("../models/index");

const cardController = {
  async getAllCards(_, res) {
    try {
      const cards = await Card.findAll();

      res.json(cards);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getAllCardsWithTodos(req, res, next) {
    try {
      const { board_id } = req.params;

      const cards = await Card.findAll({
        where: {
          board_id,
        },
        include: [
          {
            association: "todos",
            include: [{ association: "tags" }],
          },
        ],
        order: [
          ["position", "ASC"],
          ["todos", "position", "ASC"],
          ["todos", "tags", "name", "ASC"],
        ],
      });

      if (!cards.length) {
        return next();
      }

      return res.json(cards);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async postNewCard(req, res, next) {
    try {
      const { board_id } = req.params;
      let { title } = req.body;
      //let { position } = req.body;

      if (!title) {
        return next();
      }

      const lastedCard = await Card.findAll({
        limit: 1,
        where: { board_id },
        order: [["createdAt", "DESC"]],
      });

      if (!lastedCard) {
        const card = await Card.create({ title, board_id, position: 1 });
        return res.status(201).json(card);
      }

      const cardPosition = lastedCard[0].position + 1;

      const card = await Card.create({
        title,
        board_id,
        position: cardPosition,
      });

      return res.status(201).json(card);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getOneCardByPk(req, res, next) {
    try {
      const { id } = req.params;
      const card = await Card.findByPk(id);

      if (!card) {
        return next();
      }

      return res.json(card);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getOneCardWithTodosByPk(req, res, next) {
    try {
      const { card_id } = req.params;

      const card = await Card.findByPk(card_id, {
        include: [{ association: "todos", include: [{ association: "tags" }] }],
        order: [
          ["todos", "position", "ASC"],
          ["todos", "tags", "name", "ASC"],
        ],
      });

      if (!card) {
        return next();
      }

      return res.json(card);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async updateCard(req, res, next) {
    try {
      const { card_id } = req.params;
      const userInput = req.body;

      const result = await Card.update(userInput, {
        where: { id: card_id },
        returning: true,
      });

      const [, [card]] = result;

      if (!card) {
        return next();
      }

      return res.json(card);
    } catch (error) {
      console.error(error);
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async deleteOneCard(req, res, next) {
    try {
      const { card_id } = req.params;
      const deletedCard = await Card.destroy({ where: { id: card_id } });

      if (!deletedCard) {
        return next();
      }

      return res.status(204).json();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async deleteAllCardsByBoard(req, res, next) {
    try {
      const { board_id } = req.params;

      await Card.destroy({
        where: {
          board_id,
        },
      });

      return res.status(204).json();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async deleteAllCards(req, res, next) {
    try {
      const deletedCards = await Card.destroy();

      if (!deletedCards) {
        return next();
      }

      return res.status(204).json();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = cardController;
