const { User } = require('../../models/user')

const getUserDetails = async(req,res)=>{
    try {
        User.find({}).then((response)=>{
           
            res.status(200).json(response)
        })
    } catch (error) {
        console.log(error);
    }
}

const blockUser = async(req,res)=>{
    console.log("aaaaaaaaaaa=======10");
    try {
        const id = req.params.id;
       await User.findByIdAndUpdate(id,{$set:{
        isBlocked:true
       }}).then((response)=>{
        console.log("block updating",response);
        res.status(200).json({blocked:true,message:"user blocked successfully"})
       })
    } catch (error) {
       console.log(error); 
    }
}

const unBlockUser = async(req,res)=>{ 
    try {
        const id = req.params.id;
        await User.findByIdAndUpdate(id,{$set:{
            isBlocked:false
        }}).then((response)=>{
            console.log("unblock updating",response);
            res.status(200).json({blocke:false,message:'user unblocked successfully'})   
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUserDetails,
    blockUser,
    unBlockUser
}