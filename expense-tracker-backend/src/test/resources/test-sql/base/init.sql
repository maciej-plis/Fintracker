-- INIT TABLE --
CREATE TABLE IF NOT EXISTS base
(
    id   SERIAL PRIMARY KEY,
    NAME CHAR(50),
    DATE DATE
);

-- INIT DATA --
INSERT INTO base (id, name, date)
VALUES (0, 'Alfa', '2020-01-02'),
       (1, 'Bravo', '2020-01-02'),
       (2, 'Charlie', '2020-01-02'),
       (3, 'Delta', '2020-01-03'),
       (4, 'Echo', '2020-01-04'),
       (5, 'Foxtrot', '2020-01-04'),
       (6, 'Golf', '2020-01-05'),
       (7, 'Hotel', '2020-01-05'),
       (8, 'India', '2020-01-02'),
       (9, 'Juliet', '2020-01-01');
