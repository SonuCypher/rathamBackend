const { default: mongoose } = require("mongoose");

const deanSchema = mongoose.Schema({
    deanId:{
        type:String,
        lowercase:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports.Dean = mongoose.model('Dean',deanSchema)