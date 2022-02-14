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
        res.json(results.rows[0])
    })
})

//INSERT ITEM 

router.post('/', (req, res) => {
    // const {title, description, duedate, tags} = req.body
    const {title, description, duedate, tags, creator_id} = req.body
    console.log(req.body)
    postgres.query(`INSERT INTO item (title, description, duedate, tags, creator_id) VALUES ('${title}','${description}', '${duedate}', '{${tags}}', ${creator_id})`, (err, results) => {
        console.log(results)
        postgres.query('SELECT * FROM item ORDER BY item_id ASC;', (err, results)=>{
            res.json(results.rows)
        })
    }); 
});

//UPDATE ITEM 

router.put('/:id', (req,res)=>{
    const id = req.params.id
    const {title, description, duedate, tags, creator_id} = req.body
    postgres.query(`UPDATE item SET title = '${title}', description = '${description}', duedate = '${duedate}', tags = '{${tags}}', creator_id = ${creator_id} WHERE item_id = ${id}`, (err, results)=>{
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
