const mongoose = require('mongoose')


const QuestionSchema = new mongoose.Schema({
    questionName: String,
    questionUrl: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    answers: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Answers"
    },
    user:Object,
    report:{
        type:Boolean,
        default:false
    },
    reason:[{type:String}],
    upVote:[{type:mongoose.SchemaTypes.ObjectId}],
    downVote:[{type:mongoose.SchemaTypes.ObjectId}]
})

module.exports = mongoose.model("Questions",QuestionSchema)