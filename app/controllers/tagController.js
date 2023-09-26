const Tag = require("../models/tag");

const todoController = {
  async getAllTags(req, res, next) {
    try {
      const tags = await Tag.findAll({});

      res.json({ tags });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async getOneTag(req, res, next) {
    try {
      const tag = await Tag.findByPk({ id: req.params });

      res.json({ tag });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async newTag(req, res, next) {
    try {
      res.json({ tag });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async updateTag(req, res, next) {
    try {
      const tag = await Tag.findByPk({ id: req.params });

    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  async deleteTag(req, res, next) {
    try {
      const tag = await Tag.findByPk({ id: req.params });

      tag.destroy();

    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },
};

module.exports = todoController;
