const express = require('express');
const router = express.Router();
const postgres = require('../database.js');

// GET  ALL ITEMS  
router.get('/', (req, res) => {
    postgres.query('SELECT * FROM item ORDER BY item_id ASC;', (err, results) => {
        res.json(results.rows)
    }); 
});

//GET SINGLE ITEM 

//INSERT ITEM 

//UPDATE ITEM 

//DELETE ITEM 




module.exports = router;
