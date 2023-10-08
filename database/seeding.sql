BEGIN;

TRUNCATE TABLE "member", "board", "card", "todo", "tag", "todo_has_tag" RESTART IDENTITY CASCADE;

INSERT INTO "member" ("email", "password", "role")
VALUES
('admin@admin.io', 'azerty', 'admin'),
('alice.smith@example.com', 'mdpSecret456', 'membre'),
('bob.johnson@example.com', 'monMotDePasse789', 'membre');

INSERT INTO "board" ("title", "description", "member_id")
VALUES
('Tableau Personnel', 'Mes tâches personnelles', 1),
('Tableau Projet', 'Projets professionnels', 1),
('Tableau Maison', 'Tâches ménagères', 1),
('Tableau Loisirs', 'Loisirs et divertissements', 1);

INSERT INTO "card" ("title", "position", "board_id")
VALUES
('Liste des courses', 1, 1),
('Projet A', 1, 2),
('Projet B', 2, 2),
('Tâches ménagères', 2, 3),
('Loisirs du week-end', 1, 4);

INSERT INTO "todo" ("title", "card_id", "position")
VALUES
('Acheter du lait', 1, 1),
('Acheter des légumes', 1, 2),
('Acheter du pain', 1, 3),
('Faire le gâteau', 1, 4),
('Préparer le rapport', 2, 2),
('Réunion client', 2, 1),
('Développer les erreurs', 3, 3),
('Faire le debrief', 3, 1),
('Déployer la bdd', 3, 2),
('Aspirer le salon', 4, 2),
('Faire du jogging', 4, 1),
('Réserver une table au restaurant', 5, 3),
('Finir zelda', 5, 1),
('Faire le ménage', 5, 2);

INSERT INTO "tag" ("name", "color")
VALUES
('Urgent', 'red'),
('chapochapo', 'yellow'),
('Personnel', 'blue'),
('Travail', 'orange'),
('Loisirs', 'green');

INSERT INTO "todo_has_tag" ("todo_id", "tag_id")
VALUES
(1, 1),
(4, 2),
(8, 3),
(10, 3),
(11, 3),
(12, 3),
(12, 1),
(12, 5),
(5, 4),
(6, 4),
(6, 1),
(9, 4),
(13, 5),
(14, 5);

COMMIT;