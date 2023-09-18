
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Dean } = require('../models/dean')
const { FreeSession } = require('../models/freeSession')
const SECRETKEY = "JWTSECRET"// should be stored in .env file



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
    const components = datetime.split(',')
    const Year = parseInt(components[0]);
    const Month = parseInt(components[1]) - 1; 
    const Day = parseInt(components[2])+1;

    const startTime= new Date(Year,Month,Day)
    try {
        const dean = await Dean.findById(id)
        if (dean) {
            const newSession = await new FreeSession({
                deanId:dean.deanId,
                day,
                startTime:startTime
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

module.exports.getPendingSession = async(req, res) => {
    const {id} = req.params
    const currentDate = new Date();
    try {
        const dean = await Dean.findById(id)
        if (dean) {
            const pendingSession = await FreeSession.find({
                deanId: dean.deanId,
                booked: true,
                startTime: { $gt: currentDate }
            })
            res.json(pendingSession)

        } else {
            res.json("user not found")
        }
    } catch (error) {
        res.json(error.message)
        console.log(error)
    }
}

