const express = require('express');
const app = express();

const Product = require('./models/product.model.js');

const mongoose = require('mongoose');

// we are not allowed to pass JSON through our node js by default
// we have to use middleware - we have to configure it
app.use(express.json());


app.get('/', (req,res)=> {
    res.send('heyo');
})

app.post('/api/products', async (req, res) => {
    // console.log(req.body);
    // res.send(req.body);
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product); 
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/products', async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

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