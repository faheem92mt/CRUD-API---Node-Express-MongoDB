const express = require('express');
const app = express();

// schema
const Product = require('./models/product.model.js');

const mongoose = require('mongoose');

// we are not allowed to pass JSON through our node js by default
// we have to use middleware - we have to configure it
app.use(express.json());

// homepage
app.get('/', (req,res)=> {
    res.send('heyo');
})

// create products
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

// get all products
app.get('/api/products', async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// get each product by id   
app.get('/api/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// update an existing product by id
app.put('/api/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        // UPDATING
        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }

        // GETTING THE UPDATED PRODUCT
        const updatedProduct = await Product.findById(id);
        // AND DISPLAYING IT
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// delete a product 
app.delete('/api/products/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const product = await Product.findByIdAndDelete(id);
        console.log(product);

        if(!product) {
            return res.status(404).json({message: "Product not found"});
        }

        res.status(200).json({message: "Product deleted successfully!"});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// server listening
app.listen(3000, ()=> {
    console.log('server is running on port 3000');
});


// mongoose database connection
const connectionString = "mongodb+srv://faheemibnhabib:whoneedsthis@shawarma.3oipfzz.mongodb.net/MyShawarmaNode-API?retryWrites=true&w=majority&appName=Shawarma"
mongoose.connect(connectionString)
.then(()=> {
    console.log("connected to db!");
})
.catch(() => {
    console.log("connection failed!");
})