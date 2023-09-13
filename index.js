const express = require('express');
const app = express();
const mongoose = require('mongoose');



mongoose.connect("mongodb://localhost:27017/RathamBackend")
.then(()=>{console.log('database connected')})
.catch((err)=>{console.log(err.message)})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/api/students",)


app.listen(3000,()=>{
    console.log('listening on port 3000')
})