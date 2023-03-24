const { User } = require('../../models/user')


const otherDetails = async(req,res)=>{
    try {
        let id = req.params.id;
        await User.findOne({_id:id}).then((response)=>{
            res.status(200).json(response)
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    otherDetails,
}