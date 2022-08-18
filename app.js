const express = require('express')
const mongoose = require('mongoose')

const customer = require('./routes/customer')
const item = require('./routes/item')
const user = require ('./routes/user')
const order = require ('./routes/Order')


const app = express()
const port = 8000

app.use(express.json())
app.use('/customer', customer)
app.use('/items',  item)
app.use('/users',user)
app.use('/orders',order)


//const url = 'mongodb://127.0.0.1/express'

// mongoose.connect(url, { useNewUrlParser: true })
// const con = mongoose.connection

// con.on("open", () => {
//     console.log('MongoDB connected!');
// })


app.listen(port, () => {
    console.log(`app starting on ${port}`);
})