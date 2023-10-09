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

  async getAllTodosByCardPk(req, res, next) {
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

  async createNewTodoByCard(req, res, next) {
    try {
      const { card_id } = req.params;
      const { title } = req.body;

      if (!title) {
        return next();
      }

      const latestTodo = await Todo.findAll({
        limit: 1,
        where: { card_id },
        order: [["createdAt", "DESC"]],
      });

      if (!latestTodo.length) {
        const todo = await Todo.create({ title, card_id, position: 1 });
        return res.status(201).json(todo);
      }

      const todoPosition = latestTodo[0].position + 1;

      const todo = await Todo.create({
        title,
        card_id,
        position: todoPosition,
      });

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
};

module.exports = TodoController;
