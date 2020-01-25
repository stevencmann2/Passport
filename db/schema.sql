DROP DATABASE IF EXISTS base;
CREATE DATABASE base;
USE base;




CREATE TABLE trip(
	user_ID VARCHAR(100),
	trip_ID VARCHAR(100),
    trip_name VARCHAR(20),
    total_budget DECIMAL(9,2),
    destination VARCHAR(100),
    departing VARCHAR(100),
    returning VARCHAR(100)
    
);


CREATE TABLE personallist(

user_ID VARCHAR(30),
trip_ID VARCHAR(30),
todo_1 VARCHAR(100),
todo_2 VARCHAR(100),
todo_3 VARCHAR(100),
todo_4 VARCHAR(100),
todo_5 VARCHAR(100),
todo_6 VARCHAR(100)


);

