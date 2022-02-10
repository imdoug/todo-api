const bcrypt = require('bcrypt')
const express = require('express');
const router = express.Router();
const postgres = require('../database.js');

// LOGIN ROUTE
router.post('/', (req, res) => {
    const {email, password} = req.body
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    postgres.query(`SELECT * FROM users WHERE email = '${email}'`,(err,results)=>{
        if(err){
            res.send('We had a problem during your login')
        }else if(results.rows.length <= 0){
            res.send('User not found, check your email')
        }else
            if(bcrypt.compareSync(password, results.rows[0].password)){
                const {user_id, email} = results.rows[0]
                res.json({user_id,email})
            }else
                res.send("Password don't match, please try again")
    })
});




module.exports = router;