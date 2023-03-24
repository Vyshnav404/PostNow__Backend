const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")

const adminSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true
    }, 
    password:{
        type:String,
        required:true
    },
})

adminSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
      { _id: this._id },
      process.env.JWTADMINPRIVATEKEY,
      { expiresIn: "7d" }
    );
    return token;
  };


const Admin = mongoose.model('admin',adminSchema);

module.exports = {Admin}