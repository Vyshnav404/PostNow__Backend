const PostDb = require('../../models/post')

const getReportedPost = async(req,res)=>{
    try {
       await PostDb.find({report:true}).then((response)=>{
        res.status(200).json(response)
       }) 
    } catch (error) {
        console.log(error);
    }
}


const getSingleReportedPost = async(req,res)=>{
    try {
        let id = req.params.id
        await PostDb.findById(id).then((response)=>{
            res.status(200).json(response)
        })
    } catch (error) {
        console.log(error);
    }
}


const deleteReportPost = async(req,res)=>{
    try {
        let id = req.params.id
        await PostDb.findByIdAndDelete(id).then((response)=>{
            res.status(200).json(response)
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getReportedPost,
    getSingleReportedPost,
    deleteReportPost
}