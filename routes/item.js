const express = require('express')
const mysql = require('mysql')
const db = require('../configs/db.config')

const connection = mysql.createConnection(db.database)

connection.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log('Connected to the MYSQL server');
        var userTableQuery = "CREATE TABLE IF NOT EXISTS items (code VARCHAR(255) PRIMARY KEY, name VARCHAR(255), discription Varchar(255), price double, qtyOnHand int(10))"
        connection.query(userTableQuery, function(err,result){
            if(err) throw err;
            console.log(result);
            if(result.warningCount === 0){
                console.log('Item table created');
            }
        })
    }
})

const router = express.Router()

router.get('/',(req, res) =>{   
    var query = "SELECT * FROM items"

    connection.query(query,(err,rows) =>{
        if(err) throw err

        res.send(rows)
    })
})

router.post('/',(req, res) =>{
    const code = req.body.code
    const name = req.body.name
    const discription = req.body.discription
    const price = req.body.price
    const qtyOnHand = req.body.qtyOnHand
   
    var query = "INSERT INTO items (code, name, discription, price, qtyOnHand) VALUES (?,?,?,?,?)"

    connection.query(query, [code, name, discription, price, qtyOnHand], (err) =>{
        if(err){
            res.send({"message" : "duplicate entry"})
        }else{
            res.send({"message" : "Item succesfully added!"})
        }
    })
})

router.put('/',(req, res) =>{
    const code = req.body.code
    const name = req.body.name
    const discription = req.body.discription
    const price = req.body.price
    const qtyOnHand = req.body.qtyOnHand

    var query = "UPDATE items SET name=?, discription=?, price=?, qtyOnHand=? WHERE code=?"

    connection.query(query, [name, discription, price, qtyOnHand, code], (err,rows) =>{
        if(err) console.log(err);
        
        if(rows.affectedRows > 0){
            res.send({'message' : 'Item Updated'})
        }else{
            res.send({'message' : 'Item not found'})
        }
    })
})

router.delete('/:code', (req, res) => {
    const code = req.params.code

    var query = "DELETE FROM items WHERE code=?";

    connection.query(query, [code], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({ 'message': 'Item deleted' })
        } else {
            res.send({ 'message': 'Item not found' })
        }
    })
})

//get items by code
router.get('/:code', (req, res) => {
    const code = req.params.code

    var query = "SELECT * FROM items WHERE code=?"

    connection.query(query, [code], (err, rows) => {
        if (err) console.log(err);

        res.send(rows)
    })
})

module.exports = router