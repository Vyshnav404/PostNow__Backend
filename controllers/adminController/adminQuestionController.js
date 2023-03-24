const questionDB = require('../../models/question')

const getReportQuestion  = async(req,res)=>{
    try {
        questionDB.find({report:true}).then((response)=>{
            res.status(200).json(response)
        })
    } catch (error) {
        console.log(error);
    }
}

const getReportQuestionDetails = async(req,res)=>{
    
    try {
       let id = req.params.row
     await questionDB.findById(id).then((response)=>{
        res.status(200).json(response)
    
     })
    } catch (error) {
        console.log(error);
    }
}

const deleteQuestion = async(req,res)=>{
    try {
     let id = req.params.qid;
    questionDB.findByIdAndDelete(id).then((response)=>{
        res.status(200)
    })
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getReportQuestion,
    getReportQuestionDetails,
    deleteQuestion
}