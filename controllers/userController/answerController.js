const answerDB = require('../../models/answer')

const addAnswer = async(req,res)=>{
    console.log('cooooooommmmme',req.body);
    try {
        await answerDB.create({
            user:req.body.user,
            answer: req.body.answer,
            questionId: req.body.questionId
        }).then(()=>{
            res.status(201).send({
                status: true,
                message: 'Answer added successfully'
            })
        }).catch((e)=>{
            res.status(400).send({
                status: false,
                message: "Bad request"
            }) 
        })
        
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error while adding answer'
        })
    }
}

const getAllQuestion = async(req,res)=>{
    try {
        let id = req.params.qid
        console.log("dddddaaaaaa",id);
        await answerDB.find({questionId:Object(id)}).then((response)=>{
            console.log(response,"response");
            res.status(200).json(response)
        }) 
    } catch (error) {
        
    }
}

module.exports= {
    addAnswer,
    getAllQuestion
}