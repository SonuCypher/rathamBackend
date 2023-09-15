const { default: mongoose } = require("mongoose");


const freeSessionSchema = mongoose.Schema({
    deanId:{
        type:String,
        lowercase:true,
        required:true
    },
    studentId:{
        type:String,
        lowercase:true,
        default:null
    },
    day:{
        type:String,
        lowercase:true,
        required:true
    },
    startTime:{
        type:Date,
        required:true
    },
    booked:{
        type:Boolean,
        default:false
    }
})

module.exports.FreeSession = mongoose.model('FreeSession',freeSessionSchema)