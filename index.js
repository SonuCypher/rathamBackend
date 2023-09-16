const express = require('express');
const app = express();
const mongoose = require('mongoose');
const studentRoute = require('./routes/student')
const deanRoute = require('./routes/dean')



mongoose.connect("mongodb://localhost:27017/RathamBackend")
.then(()=>{console.log('database connected')})
.catch((err)=>{console.log(err.message)})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/api/students",studentRoute)
app.use("/api/dean",deanRoute)

const date ="2023,10,1,12"
const newDate = new Date(2023,10,1)
console.log(newDate)
console.log(new Date())
app.listen(3000,()=>{
    console.log('listening on port 3000')
})