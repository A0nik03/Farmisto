const express = require('express');
const dotenv = require('dotenv');
const app = express();

app.get('/',(req,res)=>{
    res.send('Server is Working!');
}
);

app.listen(process.env.port,()=>{
    console.log('Server is running');
})