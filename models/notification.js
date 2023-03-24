const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    read:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:DataTransfer,
        default:Date.now
    }
});
module.exports = mongoose.model('Notification',notificationSchema);