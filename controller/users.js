const bcrypt = require('bcrypt')
const express = require('express');
const router = express.Router();
const postgres = require('../database.js');

// GET  ALL USERS  
router.get('/', (req, res) => {
    postgres.query('SELECT * FROM users ORDER BY user_id ASC;', (err, results) => {
        res.json(results.rows)
    }); 
});

//GET USER ITEM 

router.get('/:id', (req,res)=>{
    const id = req.params.id
    postgres.query(`SELECT * from users WHERE item_id = ${id}`,(err,results)=>{
        res.json(results.rows)
    })
})

//CREATE USER 

router.post('/', (req, res) => {
    const {email, password} = req.body
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    postgres.query(`INSERT INTO users (email, password) VALUES ('${email}','${hashedPassword}')`, (err, results) => {
        postgres.query('SELECT * FROM users ORDER BY user_id ASC;', (err, results)=>{
            res.json(results.rows)
        })
    }); 
});


module.exports = router;