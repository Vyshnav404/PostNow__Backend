const { User } = require('../../models/user')

const getFriend = async(req,res)=>{
    try {
        friendId=req.params.friendId
       await User.findById(friendId).then((response)=>{
        console.log(response);
        res.status(200).json(response)
       })
    } catch (error) {
        
    }
}


module.exports = {
    getFriend
}