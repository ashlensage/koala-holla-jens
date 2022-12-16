CREATE TABLE koala (
    "id" serial PRIMARY KEY,
    "name" varchar(12) NOT NULL,
    "gender" varchar(1),
    "age" integer,
    "ready_to_transfer" varchar(1),
    "notes" varchar(120)
);

INSERT INTO "koala"("name","gender","age","ready_to_transfer","notes")
VALUES ('Scotty', 'M', '4', 'Y', 'Born in Guatemala'),  ('Jean', 'F', '5', 'Y', 'Allergic to lots of lava'),('Ororo', 'F', '7', 'N', 'Loves listening to Paula (Abdul)'), ('Logan', 'M', '15', 'N', 'Loves the sauna'), ('Charlie','M', '9','Y', 'Favorite band is Nirvana'),('Besty','F','4','Y','Has a pet iguana');
