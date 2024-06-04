const express = require('express');
const {authMiddleware} = require('../middlewares/middlewares')
const {Account} = require('../schemas/db');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get('/balance',authMiddleware,async (req,res)=>{
    const userId = req.userId;
    const user = await Account.findOne({
        userId : req.userId
    });
    
    res.json({
        balance : user.balance
    })
});

router.post('/transfer',authMiddleware,async (req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();   
   
    const {amount, to} = req.body;
    const from = req.userId;

    const toAccount = await Account.findOne({userId: to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            mssg: "No such User exists"
        });
    }
    const {balance} = await Account.findOne({userId: from});
    if(balance< amount){
        await session.abortTransaction();
        return res.status(400).json({
            mssg :" Insufficient Funds"
        });
    }
    
    await Account.updateOne({userId: from},{$inc: {balance: -amount }}).session(session);
    await Account.updateOne({userId:to},{$inc:{balance: amount}}).session(session);
    await session.commitTransaction();
    res.status(200).json({
        mssg: "Transaction successful"
    });
    await session.endSession();
})

module.exports = router;