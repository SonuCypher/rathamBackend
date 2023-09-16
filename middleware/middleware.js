const jwt = require("jsonwebtoken");
const { Dean } = require("../models/dean");
const { Students } = require("../models/student");
const SECRETKEY = "JWTSECRET";



module.exports.DeanAuth = async(req,res,next)=>{
    const {id}= req.params
    const {token}= req.headers
    try {
        if (token) {
            const dean = await Dean.findById(id)
        if (dean) {
            const decode = jwt.verify(token,SECRETKEY)
            console.log(decode.deanId)
            console.log(dean.deanId)
            if (dean.deanId === decode.deanId) {
                next()
            } else {
                res.json("cannot verify token")
            }
        } else {
            res.json("user not found")
        }
        } else {
            res.json("sign in to proceed")
        }
        
    } catch (error) {
        res.json({error: error.message})
        console.log(error)
    }
}

module.exports.StudentAuth = async(req,res,next)=>{
    const {userid}= req.params
    const {token}= req.headers
    try {
        if (token) {
            const student = await Students.findById(userid)
        if (student) {
            const decode = jwt.verify(token,SECRETKEY)
            console.log(decode.studentId)
            console.log(student.studentId)
            if (student.studentId === decode.studentId) {
                next()
            } else {
                res.json("cannot verify token")
            }
        } else {
            res.json("user not found")
        }
        } else {
            res.json("sign in to proceed")
        }
        
    } catch (error) {
        res.json({error: error.message})
        console.log(error)
    }
}