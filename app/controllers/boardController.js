const { Board } = require("../models/index");

const boardController = {
  async getAllBoards(_, res) {
    try {
      const boards = await Board.findAll({
        where: {
          member_id: 1,
        },
      });

      res.json({ boards });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createNewBoard(req, res) {
    try {
      const userInputs = req.body;
      
      console.log(userInputs)

      const board = await Board.create(userInputs);

      return res.json(board);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getOneBoardByPk(req, res, next) {
    try {
      const { id } = req.params;
      const board = await Board.findByPk(id);

      if (!board) {
        return next();
      }

      return res.json(board);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async updateBoard(req, res, next) {
    try {
      const { id } = req.params;
      const userInput = req.body;

      const result = await Board.update(userInput, {
        where: { id },
        returning: true,
      });

      console.log(result);

      let [, [board]] = result;

      if (!board) {
        return next();
      }

      return res.json(board);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async deleteOneBoard(req, res, next) {
    try {
      const { id } = req.params;
      const deletedBoard = await Board.destroy({ where: { id } });

      if (!deletedBoard) {
        return next();
      }

      return res.status(204).json();
    } catch (error) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async deleteAllBoards(req, res, next) {
    try {
      const deletedBoards = await Board.destroy({ where: { member_id: 1 } });

      if (!deletedBoards) {
        return next();
      }

      return res.status(204).json();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = boardController;
