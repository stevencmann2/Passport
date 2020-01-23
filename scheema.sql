-- Drops the blogger if it exists currently --
DROP DATABASE IF EXISTS passport;
-- Creates the "blogger" database --
CREATE DATABASE passport;

USE passport;

CREATE TABLE users (
    user_id VARCHAR (100) NOT NULL,
    nickname VARCHAR(100) NOT NULL,
    email  VARCHAR(100) NOT NULL,
    user_password VARCHAR(100) NOT NULL
);

INSERT INTO users (user_id, nickname, email, user_password)
VALUES ('user1id', 'babylon', 'email@email.com', 'password');

SELECT * FROM users;

