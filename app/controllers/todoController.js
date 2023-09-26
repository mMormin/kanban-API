const Todo = require("../models/todo");

const todoController = {
  async getAllTodos(req, res, next) {
    try {
      const todos = await Todo.findAll({});

      res.json({ todos });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async getOneTodo(req, res, next) {
    try {
      const todo = await Todo.findByPk({ id: req.params });

      res.json({ todo });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async newTodo(req, res, next) {
    try {
      res.json({ card });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async updateTodo(req, res, next) {
    try {
      const todo = await Todo.findByPk({ id: req.params });

    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async deleteTodo(req, res, next) {
    try {
      const todo = await Todo.findByPk({ id: req.params });

      todo.destroy();

    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },
};

module.exports = todoController;
