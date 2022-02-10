//DEPENDENCIES 
const express = require('express')
const app = express();
const port = 8000;
const postgres = require('./database.js')

app.use(express.json());

// ROUTES
const itemsController = require('./controllers/item.js')
const usersController = require('./controllers/users.js')
const sessionController = require('./controllers/sessions.js')
app.use('/items', itemsController)
app.use('/users', usersController)
app.use('/sessions', sessionController)

// CONNECTION WITH DB 
postgres.connect()

// LISTENER
app.listen(process.env.PORT || port, ()=>{
    console.log(`Todo API is running on port ${port}`)
})