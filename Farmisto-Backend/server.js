const express = require('express');
const app = express();
const TestRouter = require("./routes/testRoutes")

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.status(201).json({
        message: 'Welcome to our API!',
        body: req.body,
    })
})
zzz

app.listen(4000,(req,res)=>{
    console.log('Server is running on port 4000')
})