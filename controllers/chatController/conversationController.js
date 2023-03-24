const Conversation = require('../../models/conversation')

const conversation = async(req,res)=>{
    console.log("conversation",req.body.userId);
    console.log("====conversation",req.body.friendId);
    const newConversation = new Conversation({
        members: [req.body.userId, req.body.friendId]
    });
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation)

    } catch (error) {
        res.status(500).json(error)
    }
}

const getConversation = async(req,res)=>{
    try {
        const conversation = await Conversation.find({
            members:{$in: [req.params.userId]},
        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports={
    conversation,
    getConversation
}