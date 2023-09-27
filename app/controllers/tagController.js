const { Tag } = require("../models/index");

const tagController = {
  async getAllTags(_, res) {
    try {
      const tags = await Tag.findAll();

      res.json(tags);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createNewTag(req, res) {
    try {
      const userInput = req.body;
      const tag = await Tag.create(userInput);

      res.json(tag);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getOneTagByPk(req, res, next) {
    try {
      const { id } = req.params;
      const tag = await Tag.findByPk(id);

      if (!list) {
        return next();
      }

      return res.json(tag);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async updateTag(req, res, next) {
    try {
      const { id } = req.params;
      const userInput = req.body;

      const result = await Tag.update(userInput, {
        where: { id },
        returning: true,
      });

      const [, [tag]] = result;

      if (!tag) {
        return next();
      }

      return res.json(tag);
    } catch (error) {
      console.error(err);
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async deleteOneTag(req, res, next) {
    try {
      const { id } = req.params;
      const deletedTag = await Tag.destroy({ where: { id } });

      if (!deletedTag) {
        return next();
      }

      return res.status(204).json();
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: 'Internal Server Error'});
    }
  },

  async deleteAllTags(req, res, next) {
    try {
      const deletedTags = await Tag.destroy();

      if (!deletedTags) {
        return next();
      }

      return res.status(204).json();
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: 'Internal Server Error'});
    }
  },
};

module.exports = tagController;
