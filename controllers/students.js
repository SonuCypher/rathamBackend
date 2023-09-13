
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Students } = require('../models/student')
const SECRETKEY ="JWTSECRET"

module.exports.signIn = async(req,res) =>{
    const user = req.body
    try {
        const studentExist= await Students.findOne({studentId:user.studentId})
        if (studentExist) {
            const validPassword = await bcrypt.compare(user.password, studentExist.password)
            if (validPassword) {
                const token = jwt.sign({username:studentExist.studentId,id:studentExist._id}, SECRETKEY);
                res.json({token})
            } else {
                res.json({error:"invalid password or username"})
            }
        } else {
            const password = await bcrypt.hash(user.password,12)
            const newUser = await new Students({...user, password:password})
            await newUser.save()
            
        }
    } catch (error) {
        res.json({message: error.message})
    }
}