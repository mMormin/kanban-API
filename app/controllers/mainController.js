const Board = require("../models/board");

const mainController = {
  async homePage(req, res, next) {
    try {
      const boards = await Board.findAll({
        where: {
          member_id: 1,
        },
        order: [["created_at", "DESC"]],
      });

      if (!boards.length) {
        const error = "noBoard";
        return res.render("home", { boards, error });
      }

      res.render("home", { boards });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  errorPage: (req, res) => {
    res.status(404).render("Cette ressourcec n'existe pas");
  },
};

module.exports = mainController;
