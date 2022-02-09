// _____________
// DEPENDENCIES
// _____________
const express = require('express')
const app = express();
const port = 8000;
const postgres = require('./database.js')

app.use(express.json());

// Routes
const itemsController = require('./controller/item.js')
app.use('/items', itemsController)

// connection with DB
postgres.connect()

//___________________
//Listener
//___________________
app.listen(process.env.PORT || port, ()=>{
    console.log(`Todo API is running on port ${port}`)
})