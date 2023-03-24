const express = require('express');
const router = express.Router();
const { addMessage,getMessage } = require('../controllers/chatController/messageController')


router.post('/',addMessage)
router.get('/:conversationId',getMessage)

module.exports = router