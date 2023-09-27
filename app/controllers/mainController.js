module.exports = {
  notFound(_, res) {
    res.status(404).json({ error: "Resource not found" });
  },
};
