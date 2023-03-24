const { User } = require('../../models/user')

// Follow a user
const followUser = async(req,res)=>{
    console.log("here ====== i am",req.body,req.params.id);
    const id = req.params.id
    const { currentUserId } = req.body

    if(currentUserId === id){
        res.status(403).json({msg:"Action forbidden"})
    }else{
        try {
            const followUser =await User.findById(id)
            const followingUser =await User.findById(currentUserId)

            if(!followUser.followers.includes(currentUserId)){
              let value =  await followUser.updateOne({$push : {followers: currentUserId}})
              let response =   await followingUser.updateOne({$push: {following: id}})
                res.status(200).json({value,response,msg:"User followed"})
            } else{
                res.status(403).json({msg:"User is Already followed by you"})
            }
        } catch (error) {
            res.status(500).json("fffffffollow errr",error);
        }
    }
}

const unFollowUser = async(req,res)=>{
    console.log('why ==== it is not comming');
    const id = req.params.id
    const { currentUserId } = req.body

    if(currentUserId === id){
        console.log('kkk');
        res.status(403).json({msg:"Action forbidden"})
    }else{
        console.log('bbbb');
        try {
            const followUser =await User.findById(id)
            const followingUser =await User.findById(currentUserId)

            if(followUser.followers.includes(currentUserId)){
              let value =  await followUser.updateOne({$pull : {followers: currentUserId}})
              let response =   await followingUser.updateOne({$pull: {following: id}})
                res.status(200).json({value,response,msg:"User unfollowed"})
            } else{
                res.status(403).json({msg:"User is not followed by you"})
            }
        } catch (error) {
            console.log('erere');
            res.status(500).json("eeeefddfdds",error);
        }
    }
}

module.exports={
    followUser ,
    unFollowUser
}