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

//GET SINGLE USER  

router.get('/:id', (req,res)=>{
    const id = req.params.id
    postgres.query(`SELECT * from users WHERE user_id = ${id}`,(err,results)=>{
        res.json(results.rows)
    })
})

//CREATE USER 

router.post('/', (req, res) => {
    const {email, password} = req.body
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    postgres.query(`SELECT * FROM users WHERE email = '${email}'`, (err,results)=>{
        // if email is registered already in the db 
        if(results.rows.length > 0){
            res.send('This email is already registered, use a unique email')
        // if email is unique and is not registered yet
        }else{
            postgres.query(`INSERT INTO users (email, password) VALUES ('${email}','${hashedPassword}')`, (err, results) => {
                postgres.query('SELECT * FROM users ORDER BY user_id DESC;', (err, results)=>{
                    res.json(results.rows[0])
                })
            }); 
        }
    })
});


module.exports = router;