const Board = require("../models/board");

const boardController = {
  async getAllBoards(req, res, next) {
    try {
      const boards = await Board.findAll({});

      res.json({ boards });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async getOneBoard(req, res, next) {
    try {
      const board = await Board.findByPk({ id: req.params });

      res.json({ board });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async newBoard(req, res, next) {
    try {
      res.json({ board });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async updateBoard(req, res, next) {
    try {
      const board = await Board.findByPk({ id: req.params });

      board.set

    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async deleteBoard(req, res, next) {
    try {
      const board = await Board.findByPk({ id: req.params });

      board.destroy();

    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },
};

module.exports = boardController;
