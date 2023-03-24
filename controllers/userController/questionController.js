const { json } = require('body-parser');
const questionDB = require('../../models/question')


const addQuestion = async(req,res)=>{
  console.log("alert" , req.body);

    try {
        await questionDB.create({
            questionName: req.body.questionName,
            questionUrl: req.body.questionUrl,
            user:req.body.user,
        }).then((response)=>{
            res.status(201).json(response)
        }).catch((err)=>{
            res.status(400).send({
                status: false,
                message: "Bad format"
            })
        })
    } catch (e) {
        res.status(500).send({
            status: false,
            message: "Error while adding question"
        })
    }
}

const getQuestionAnswer = async(req,res)=>{
    console.log("its comming");
    try {
        await questionDB.aggregate([
            {
                $lookup:{
                    from: "answers",
                    localField: "_id",
                    foreignField: "questionId",
                    as: "allAnswers"
                }
            }
        ]).exec().then((doc)=>{
            res.status(200).send(doc)
        }).catch((error)=>{
            res.status(500).send({
                status:false,
                message: "Unable to get the question details"
            })
        })
    } catch (e) {
        res.status(500).send({
            status:false,
            message:"Unexpected Error"
        })
    }
}

const getOneQuestion = async(req,res)=>{
    console.log("question got");
    let id = req.params.qid;
   
  try {
    await questionDB.findById({_id:id}).then((response)=>{
        res.status(200).json(response)
    })
  } catch (error) {
    console.log(error);
  }
}

const reportQuestion = async(req,res)=>{
    let qid = req.params.qid;  
    let reason = req.body.reason
    try {
      
        questionDB.findByIdAndUpdate(qid,{$push:{reason:reason}},{$set:{report:true}}).then((response)=>{
            console.log(response,"report");
            res.status(200).json(response)
        })
    } catch (error) {
        console.log(error);
    }
}

const getQuestionsOnProfile = async(req,res)=>{
    try {
        let id = req.params.id
        await questionDB.find({'user._id':id}).then((response)=>{
        res.status(200).json(response)
        })
    } catch (error) {
        console.log(error);  
    }
}


const addUpvote = async(req,res)=>{
    try {
        let postId = req.params.id
        let userId = req.body.userId

        await questionDB.updateOne({_id:postId},{$pull:{downVote:userId}});
        let valid = await questionDB.findOne({_id:postId,upVote:userId});
        if(valid){
            res.status(400)
        }else{
            await questionDB.findByIdAndUpdate(postId,{$push:{upVote:userId}}).then((response)=>{
                res.status(200).json(response)
            })
        }
    } catch (error) {
       console.log(error); 
    }
}


const downVote = async(req,res)=>{ 
    try {
        let postId = req.params.id;
        let id = req.body.userId;
        console.log("========answer",postId,id);

        await questionDB.updateOne({_id:postId}, {$pull:{upVote:id}});
        console.log("worked====");
        let value = await questionDB.findOne({_id:postId,downVote:id})
        if(value){
            res.status(400)
        }else{
            await questionDB.findByIdAndUpdate(postId, { $push:{downVote:id} }).then((response)=>{
                res.status(200).json(response)
            })
        }
    } catch (error) {
        console.log(error);
    }
}


const deleteQuestion = async(req,res)=>{
    try {
        let id = req.params.id
        await questionDB.findByIdAndDelete(id).then((response)=>{
            res.status(200).json(response)
        })
    } catch (error) {
        console.log(error);
    }
}


const getHotQuestions = async(req,res)=>{
    try {
        const hotQuestions = await questionDB.find({ $expr: { $gt: [{ $size: "$upVote"},1]}})
        res.status(200).json(hotQuestions)
    } catch (error) {
        console.log("eee123123123=======+++++++",error);
        res.status(500).json(error)
    }
}


module.exports ={
    addQuestion,
    getQuestionAnswer,
    getOneQuestion,
    reportQuestion,
    getQuestionsOnProfile,
    addUpvote,
    downVote,
    deleteQuestion,
    getHotQuestions
}