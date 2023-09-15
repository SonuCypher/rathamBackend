
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Dean } = require('../models/dean')
const { FreeSession } = require('../models/freeSession')
const SECRETKEY = "JWTSECRET"



module.exports.signIn = async(req,res) =>{
    const user = req.body
    try {
        const deanExist= await Dean.findOne({deanId:user.deanId})
        if (deanExist) {
            const validPassword = await bcrypt.compare(user.password, deanExist.password)
            if (validPassword) {
                const token = jwt.sign({deanId:deanExist.deanId}, SECRETKEY);
                res.json({token})
            } else {
                res.json({error:"invalid password or username"})
            }
        } else {
            const password = await bcrypt.hash(user.password,12)
            const token = jwt.sign({deanId:user.deanId}, SECRETKEY);
            const newUser = await new Dean({...user, password:password})
            await newUser.save()
            res.json({token})

            
        }
    } catch (error) {
        res.json({message:error.message})
        console.log(error)
    }
}

module.exports.CreateSession = async(req,res)=>{
    const {id}=req.params
    const {day,datetime}=req.body
    try {
        const dean = await Dean.findById(id)
        if (dean) {
            const newSession = await new FreeSession({
                deanId:dean.deanId,
                day,
                startTime:new Date(datetime)
            })
            await newSession.save()
            res.json(newSession)
        } else {
            res.json("not authorized")
        }
    } catch (error) {
        res.json(error.message)
        console.log(error)
    }
}

// new Date(datetime)