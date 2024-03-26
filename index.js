const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.get('/', (req,res)=> {
    res.send('hey');
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