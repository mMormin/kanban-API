BEGIN;

TRUNCATE TABLE "member", "board", "card", "todo", "tag", "todo_has_tag" RESTART IDENTITY CASCADE;

INSERT INTO "member" ("email", "password", "role")
VALUES ('admin@admin.io', 'salut', 'admin');

INSERT INTO "board" ("title", "description", "member_id")
VALUES ('Perso', 'J''ai faim !!', 1);

INSERT INTO "card" ("title", "position", "board_id")
VALUES ('Liste des courses', 0, 1);

INSERT INTO "todo" ("title", "position", "card_id")
VALUES
('5 pommes', 0, 1),
('1kg de PDT', 1, 1),
('3 Melons', 2, 1),
('Pain', 3, 1),
('Pack d''Iced Tea', 4, 1);

INSERT INTO "tag" ("name")
VALUES ('Urgent'), ('Caprice'), ('Cadeau');

INSERT INTO "todo_has_tag" ("todo_id", "tag_id")
VALUES (5, 1), (4, 2) ,(3, 3), (3, 2);

COMMIT;