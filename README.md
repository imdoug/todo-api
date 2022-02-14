# todo-list-api

## set up

1. fork this repo

in your terminal
1. clone your fork of this repo onto your local computer
2. cd into the local repo
3. run npm install

local postgres
1. open your postgres app and start the db server

1. in your terminal, run psql 
2. once inside psql, run:
    * CREATE DATABASE todo_database;
    * \c todo_database 
    * CREATE TABLE people (user_id SERIAL PRIMARY KEY, email VARCHAR(32) , password VARCHAR(1000));
    * Don’t insert any users from the terminal otherwise the password won’t be hashed and you won’t be able to login correctly . 
    * CREATE TABLE item (item_id SERIAL, title VARCHAR(32), description VARCHAR(255), duedate DATE, tags TEXT[], creator_id FOREIGN KEY REFERENCES users (user_id) );

in your terminal
1. run node server.js

in your browser
go to http://localhost:8000/ to view local app (this uses your local database)
