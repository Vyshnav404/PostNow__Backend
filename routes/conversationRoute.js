const express = require('express')
const router = express.Router();
const { conversation,getConversation }  = require('../controllers/chatController/conversationController');



router.post('/create-conversation',conversation) 
router.get('/:userId',getConversation)

module.exports = router;