const { default: mongoose } = require("mongoose");

const studentSchema = mongoose.Schema({
    studentId:{
        type:String,
        lowercase:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports.Students = mongoose.model('Students',studentSchema)