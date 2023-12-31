
BEGIN; 

DROP TABLE IF EXISTS "member",
"board",
"card",
"todo",
"tag",
"todo_has_tag";

-- -----------------------------------------------------
-- Table "member"
-- -----------------------------------------------------
CREATE TABLE "member" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, 
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "role" TEXT NOT NULL DEFAULT 'member',
  "created_at" timestamptz NOT NULL DEFAULT NOW(),
  "updated_at" timestamptz
);

-- -----------------------------------------------------
-- Table "board"
-- -----------------------------------------------------
CREATE TABLE "board" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT NULL,
  "member_id" INTEGER NOT NULL REFERENCES "member"("id") ON DELETE CASCADE,
  "created_at" timestamptz NOT NULL DEFAULT NOW(),
  "updated_at" timestamptz
);

-- -----------------------------------------------------
-- Table "card"
-- -----------------------------------------------------
CREATE TABLE "card" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL,
  "position" INTEGER NULL,
  "board_id" INTEGER NOT NULL REFERENCES "board"("id") ON DELETE CASCADE,
  "hidden" TEXT NOT NULL DEFAULT 'FALSE',
  "created_at" timestamptz NOT NULL DEFAULT NOW(),
  "updated_at" timestamptz
);

-- -----------------------------------------------------
-- Table "todo"
-- -----------------------------------------------------
CREATE TABLE "todo" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL,
  "position" INTEGER NULL,
  "card_id" INTEGER NOT NULL REFERENCES "card"("id") ON DELETE CASCADE,
  "created_at" timestamptz NOT NULL DEFAULT NOW(),
  "updated_at" timestamptz
);

-- -----------------------------------------------------
-- Table "tag"
-- -----------------------------------------------------
CREATE TABLE "tag" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "color" TEXT NULL,
  "created_at" timestamptz NOT NULL DEFAULT NOW(),
  "updated_at" timestamptz
);

-- -----------------------------------------------------
-- Table "todo_has_tag"
-- -----------------------------------------------------
CREATE TABLE "todo_has_tag" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "todo_id" INTEGER NOT NULL REFERENCES "todo"("id") ON DELETE CASCADE,
  "tag_id" INTEGER NOT NULL REFERENCES "tag"("id") ON DELETE CASCADE,
  "created_at" timestamptz NOT NULL DEFAULT NOW(),
  UNIQUE("todo_id", "tag_id")
);


COMMIT;
BEGIN;

SELECT setval('member_id_seq', (SELECT MAX(id) from "member"));
SELECT setval('board_id_seq', (SELECT MAX(id) from "board"));
SELECT setval('card_id_seq', (SELECT MAX(id) from "card"));
SELECT setval('todo_id_seq', (SELECT MAX(id) from "todo"));
SELECT setval('tag_id_seq', (SELECT MAX(id) from "tag"));

COMMIT;