const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://savinyu:IlH5dMoIgOp9nsl2@cluster0.gzrbnpi.mongodb.net/paytm')

const userTableSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    firstName : {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const Account = mongoose.model("Account",accountSchema);
const Users = mongoose.model("Users",userTableSchema);

module.exports = {
    Users,
    Account
};