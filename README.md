# todo-list-api

Todo list Api using Node.js and Postgrest 

### User model

User model is composed by:
- email ( with maximun of 32 character )
- password ( that will store the hashed password )
- user_id (unique id that will be linked to each item that is created by the user)

Item model is composed by 

- item_id (unique id to each item )
- title (todo title)
- description  ( ....... )
- duedate (2022-02-14)
- tags ( an array of text )
- creator_id FOREIGN KEY REFERENCED BY user_id 


Each Item created will carry the creator id so we only allow the owner of that todo to update, delete, and see those todos. 

#### Live app 

front end https://github.com/imdoug/todo-angular/

https://dashboard.heroku.com/apps/todo-cloud-app


