const { Card, Todo, Tag } = require("../models/index");

const mainController = {
  async getAllCardsByBoard(req, res, next) {
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

  async createNewCardFromBoard(req, res, next) {
    try {
      const { board_id } = req.params;
      let { title } = req.body;
      let { position } = req.body;

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

  async updateCardFromBoard(req, res, next) {
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
      console.error(err);
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  
  async createNewTodoByCard(req, res, next) {
    try {
      const { card_id } = req.params;
      const { title } = req.body;
      let { position } = req.body;

      if (!position) {
        position = "0";
      }

      if (!title) {
        return next();
      }

      const todo = await Todo.create({title, card_id, position});

      return res.status(201).json(todo);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getAllTodosByCard(req, res, next) {
    try {
      const { card_id } = req.params;
      const todos = await Todo.findByPk(card_id, {
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
  
  async updateTodoByCard(req, res, next) {
    try {
      const { todo_id, card_id } = req.params;
      const userInput = req.body;

      const result = await Todo.update(userInput, {
        where: { id: todo_id, card_id },
        returning: true,
      });

      const [, [todo]] = result;

      if (!todo) {
        return next();
      }

      return res.json(todo);
    } catch (error) {
      console.error(error);
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async deleteTodoByCard(req, res) {
    try {
      const { todo_id, card_id } = req.params;

      await Todo.destroy({
        where: {
          id: todo_id,
          card_id,
        },
      });

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

  async deleteAllTodosByCard(req, res, next) {
    try {
      const { card_id } = req.params;
      const todos = await Todo.findByPk(card_id);

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
