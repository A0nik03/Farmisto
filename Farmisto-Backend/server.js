const express = require('express');
const dotenv = require('dotenv');
const app = express();

app.listen(process.env.port,()=>{
    console.log('Server is running');
})