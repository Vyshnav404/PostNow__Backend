const mongoose = require('mongoose');

const adsSchema = new mongoose.Schema({
    title:{
        type:String,required:true
    },
    description:{type:String,required:true},
    imageUrl:{type:String,required:true},
    createdAt:{type:Date, default:Date.now}
});

module.exports = mongoose.model("Ads",adsSchema)