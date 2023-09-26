const Member = require("./member.js");
const Board = require("./board.js");
const Card = require("./card.js");
const Todo = require("./todo.js");
const Tag = require("./tag.js");

// MEMBER <-> BOARD
Member.hasMany(Board, {
  foreignKey: "member_id",
  as: "boardsList",
});
Board.belongsTo(Member, {
  foreignKey: "member_id",
  as: "author",
});

// BOARD <-> CARD
Board.hasMany(Card, {
  foreignKey: "board_id",
  as: "cardsList",
});
Card.belongsTo(Board, {
  foreignKey: "board_id",
  as: "board",
});

// CARD <-> TODO
Card.hasMany(Todo, {
  foreignKey: "card_id",
  as: "todoList",
});
Todo.belongsTo(Card, {
  foreignKey: "card_id",
  as: "card",
});

// TODO <-> TAG
Todo.belongsToMany(Tag, {
  through: "todo_has_tag",
  foreignKey: "todo_id",
  as: "tagsList",
});
Tag.belongsToMany(Todo, {
  through: "todo_has_tag",
  foreignKey: "tag_id",
  as: "todoList",
});

module.exports = {
  Member,
  Board,
  Card,
  Todo,
  Tag,
};
