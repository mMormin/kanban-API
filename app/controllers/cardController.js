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

  async createNewCard(req, res, next) {
    try {
      let { title, position } = req.body;
      const board_id = 1;

      if (!position) {
        position = 0;
      }

      if (!title) {
        return next();
      }

      const card = await Card.create({ title, board_id, position });

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

  async updateCard(req, res, next) {
    try {
      const { id } = req.params;
      const userInput = req.body;

      const result = await Card.update(userInput, {
        where: { id },
        returning: true,
      });

      const [, [card]] = result;

      if (!card) {
        return next();
      }

      return res.json(card);
    } catch (error) {
      console.error(err);
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async deleteOneCard(req, res, next) {
    try {
      const { id } = req.params;
      const deletedCard = await Card.destroy({ where: { id } });

      if (!deletedCard) {
        return next();
      }

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
