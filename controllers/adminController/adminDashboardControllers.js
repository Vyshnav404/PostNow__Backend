const postDB = require('../../models/post')
const questionDB = require('../../models/question')
const AdsDB = require('../../models/AdsModel')

const getAllPosts = async(req,res)=>{
    try {
        await postDB.find().then((response)=>{
            res.status(200).json(response)
        })
    } catch (error) {
       console.log(error); 
    }
}


const getAllQuestions = async(req,res)=>{
    try {
        await questionDB.find().then((response)=>{
            res.status(200).json(response)
        })
    } catch (error) {
      console.log(error);  
    }
}

const getAdsLength = async(req,res)=>{
    try {
        await AdsDB.find().then((response)=>{
            res.status(200).json(response)
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    getAllPosts,
    getAllQuestions,
    getAdsLength
}