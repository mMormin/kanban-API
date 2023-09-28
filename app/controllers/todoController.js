const { Todo } = require("../models/index");

const TodoController = {
  async getAllTodos(_, res) {
    try {
      const todos = await Todo.findAll();

      res.json(todos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createNewTodo(req, res, next) {
    try {
      let { title, position } = req.body;
      const card_id = 1;

      if (!position) {
        position = 0;
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

  async getOneTodoByPk(req, res, next) {
    try {
      const { id } = req.params;
      const todo = await Todo.findByPk(id);

      if (!todo) {
        return next();
      }

      return res.json(todo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async updateTodo(req, res, next) {
    try {
      const { id } = req.params;
      const userInput = req.body;

      const result = await Todo.update(userInput, {
        where: { id },
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

  async deleteOneTodo(req, res, next) {
    try {
      const { id } = req.params;
      const deletedTodo = await Todo.destroy({ where: { id } });

      if (!deletedTodo) {
        return next();
      }

      return res.status(204).json();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = TodoController;
