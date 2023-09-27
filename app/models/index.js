const Member = require("./member.js");
const Board = require("./board.js");
const Card = require("./card.js");
const Todo = require("./todo.js");
const Tag = require("./tag.js");

// MEMBER <-> BOARD
Member.hasMany(Board, {
  as: "boards",
  foreignKey: "member_id",
});
Board.belongsTo(Member, {
  as: "user",
  foreignKey: "member_id",
});

// BOARD <-> CARD
Board.hasMany(Card, {
  as: "cards",
  foreignKey: "board_id",
});
Card.belongsTo(Board, {
  as: "board",
  foreignKey: "board_id",
});

// CARD <-> TODO
Card.hasMany(Todo, {
  as: "todos",
  foreignKey: "card_id",
});
Todo.belongsTo(Card, {
  as: "card",
  foreignKey: "card_id",
});

// TODO <-> TAG
Todo.belongsToMany(Tag, {
  as: "tags",
  through: "todo_has_tag",
  foreignKey: "todo_id",
  otherKey: "tag_id",
  updatedAt: false,
});
Tag.belongsToMany(Todo, {
  as: "todos",
  through: "todo_has_tag",
  foreignKey: "tag_id",
  otherKey: "todo_id",
  updatedAt: false,
});

module.exports = {
  Member,
  Board,
  Card,
  Todo,
  Tag,
};
