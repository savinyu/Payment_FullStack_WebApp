const express = require('express');
const zod  = require('zod');
const {Users, Account} = require('../schemas/db')
const jwt = require('jsonwebtoken');
const {JWTsecret} = require('../config.js')
const {authMiddleware} = require('../middlewares/middlewares.js')

const router = express.Router();


const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6).trim(),
    firstName: zod.string(),
    lastName: zod.string()
});

router.post('/signup',async (req,res)=>{ 
    const credentials = req.body;
    const {success} = signupBody.safeParse(credentials);

    if(!success){
        return res.json({mssg: "Incorrect Details"});
    }
    const existingUser = Users.findOne({username:credentials.username})
    if(existingUser._id){
        return res.json({mssg: "User already exists"});
    }
    const user = await Users.create({
        username: credentials.username,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        password: credentials.password
    });
    const bal = await Account.create({
        userId: user._id,
        balance: 1 + Math.random()*1000
    }) 
    if(user){
        const token = jwt.sign({userId:user._id},JWTsecret);
        return res.json({
            message: "User created successfully",
            token: "Bearer " + token
        }); 
    }
    res.json({mssg: "Some error occured"});
});

const signinBody = zod.object({
    username: zod.string(),
    password: zod.string().min(6)
});

router.post('/signin',async (req,res)=>{
    const credentials = req.body;
    const {success} = signinBody.safeParse(credentials);
    if(!success){
        return res.status(411).json({
            mssg: "Invalid inputs"
        })
    }
    const user = await Users.findOne({
        username: credentials.username,
        password: credentials.password
    });
    if(user){
        const token = jwt.sign({userId: user._id},JWTsecret);
        res.json({
            token: "Bearer " + token
        });
        return;
    }
    return res.status(403).json({
        mssg: "Error logging in"
    });
});

router.get('/bulk',async (req,res)=>{
    const filter = req.query.filter || "";
    const users = await Users.find({
        $or:[{
            firstName:{
                "$regex": filter
            }
            },{
                lastName: {
                    $regex: filter
                }
            }
        ]
    });
    res.json({
        user: users.map(user=>({
            username : user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id : user._id
        })) 
    });
});

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});

router.put('/',authMiddleware,async (req,res)=>{
    const payload = req.body;
    const {success} = updateBody.safeParse(payload);
    if(!success){
        return res.status(411).json({
            mssg: "Invalid Inputs"
        });
    }
    await Users.updateOne(payload,{
        _id: req.userId
    })
    res.json({
        mssg: "Updated successfully"
    });
});

module.exports = router;

