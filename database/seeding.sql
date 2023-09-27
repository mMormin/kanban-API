BEGIN;

INSERT INTO "member" ("id", "email", "password", "role") VALUES (1, 'admin@admin.io', 'salut', 'admin');
INSERT INTO "board" ("id", "title", "description", "member_id") VALUES (1, 'Perso', 'J''ai faim !!', 1);
INSERT INTO "card" ("id", "title", "position", "board_id") VALUES (1, 'Liste des courses', 0, 1);
INSERT INTO "todo" ("id", "title", "position", "card_id") VALUES (1, '5 pommes', 0, 1), (2, '1kg de PDT', 1, 1), (3, '3 Melons', 2, 1), (4, 'Pain', 3, 1), (5, 'Pack d''Iced Tea', 4, 1);
INSERT INTO "tag" ("id", "name") VALUES (1, 'Urgent'), (2, 'Caprice'), (3, 'Cadeau');
INSERT INTO "todo_has_tag" ("todo_id", "tag_id") VALUES (5, 1), (4, 2) ,(3, 3), (3, 2);

COMMIT;