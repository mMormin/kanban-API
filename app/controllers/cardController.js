const Card = require("../models/card");

const cardController = {
  async getAllCards(req, res, next) {
    try {
      const cards = await Card.findAll({});

      res.json({ cards });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async getOneCard(req, res, next) {
    try {
      const card = await Card.findByPk({ id: req.params });

      res.json({ card });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async newCard(req, res, next) {
    try {
      res.json({ card });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async updateCard(req, res, next) {
    try {
      const card = await Card.findByPk({ id: req.params });

    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async deleteCard(req, res, next) {
    try {
      const card = await Card.findByPk({ id: req.params });

      card.destroy();

    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },
};

module.exports = cardController;
