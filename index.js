const express = require('express');
const app = express();

const Product = require('./models/product.model.js');

const mongoose = require('mongoose');

// middleware
app.use(express.json());

app.get('/', (req,res)=> {
    res.send('hey');
})

app.post('/api/products', (req, res) => {
    // console.log(req.body);
    // res.send(req.body);
    try {

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.listen(3000, ()=> {
    console.log('server is running on port 3000');
});

mongoose.connect("mongodb+srv://faheemibnhabib:whoneedsthis@shawarma.3oipfzz.mongodb.net/MyShawarmaNode-API?retryWrites=true&w=majority&appName=Shawarma")
.then(()=> {
    console.log("connected to db!");
})
.catch(() => {
    console.log("connection failed!");
})