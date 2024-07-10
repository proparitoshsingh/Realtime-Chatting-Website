const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB=require("./config/db");

connectDB();
const app = express();

const port = process.env.PORT;

app.get('/',(req,res)=>{
   res.send("API is running")
})


app.listen(port,()=>{
   console.log("server listening at port : ",port)
});