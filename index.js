const express = require('express');
const app = express();
const mongoose = require('mongoose');
const studentRoute = require('./routes/student')



mongoose.connect("mongodb://localhost:27017/RathamBackend")
.then(()=>{console.log('database connected')})
.catch((err)=>{console.log(err.message)})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/api/students",studentRoute)


app.listen(3000,()=>{
    console.log('listening on port 3000')
})