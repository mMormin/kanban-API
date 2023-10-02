const { Card, Todo, Tag } = require("../models/index");

const mainController = {
  async getAllCardsByBoard(req, res, next) {
    try {
      const { id } = req.params;

      const cards = await Card.findAll({
        where: {
          board_id: id,
        },
        include: [
          {
            association: "todos",
            include: [{ association: "tags" }],
          },
        ],
        order: [
          ["id", "ASC"],
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

  async getOneCardByBoard(req, res, next) {
    try {
      const { id } = req.params;

      const card = await Card.findByPk(id, {
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

  async createNewCardFromBoard(req, res) {
    try {
      const { id } = req.params;
      let { title } = req.body;
      let { position } = req.body;
      const board_id = id;

      if (!position) {
        position = "0";
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
  

  async getAllTodosByCard(req, res, next) {
    try {
      const { id } = req.params;
      const todos = await Todo.findByPk(id, {
        include: [{ association: "tags" }],
        order: [
          ["position", "ASC"],
          ["tags", "name", "ASC"],
        ],
      });

      if (!todos) {
        return next();
      }

      return res.json(todos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async deleteAllCardsByBoard(req, res, next) {
    try {

      console.log("HI THERE")

      const { id } = req.params;

      const cards = await Card.destroy({
        where: {
          board_id: id,
        },
      });

      return res.status(204).json();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async deleteAllTodosByCard(req, res, next) {
    try {
      const { id } = req.params;
      const todos = await Todo.findByPk(id);

      if (!todos) {
        return next();
      }

      await todos.destroy();

      return res.status(204).json();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getAllTagsByTodo(req, res, next) {
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

  async CreateNewTodoHasTag(req, res, next) {
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
