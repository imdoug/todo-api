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

router.get('/:id', (req,res)=>{
    const id = req.params.id
    postgres.query(`SELECT * from item WHERE item_id = ${id}`,(err,results)=>{
        res.json(results.rows)
    })
})

//INSERT ITEM 

router.post('/', (req, res) => {
    // const {title, description, duedate, tags} = req.body
    const {title, description, duedate, tags} = req.body
    console.log(tags)
    postgres.query(`INSERT INTO item (title, description, duedate, tags) VALUES ('${title}','${description}', '${duedate}', '{${tags}}')`, (err, results) => {
        postgres.query('SELECT * FROM item ORDER BY item_id ASC;', (err, results)=>{
            res.json(results.rows)
        })
    }); 
});

//UPDATE ITEM 

router.put('/:id', (req,res)=>{
    const id = req.params.id
    const {title, description, duedate, tags} = req.body
    postgres.query(`UPDATE item SET title = '${title}', description = '${description}', duedate = '${duedate}', tags = '{${tags}}' WHERE item_id = ${id}`, (err, results)=>{
        postgres.query('SELECT * FROM item ORDER BY item_id ASC;', (err, results)=>{
            res.json(results.rows)
        })
    })
})

//DELETE ITEM 

router.delete('/:id', (req,res)=>{
    const id = req.params.id
    postgres.query(`DELETE FROM item WHERE item_id = ${id};`,(err,results)=>{
        if(err){
            console.log(err)
        }
        postgres.query('SELECT * FROM item ORDER BY item_id ASC;', (err, results)=>{
            if(err){
                console.log(err)
            }
            res.json(results.rows)
        })
    })
})




module.exports = router;
