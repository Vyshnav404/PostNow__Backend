const express = require('express');
const { adminLogin } = require('../controllers/adminController/adminLoginController')
const { getUserDetails ,
    blockUser,unBlockUser} = require('../controllers/adminController/adminUserDetails')
const { getReportQuestion,getReportQuestionDetails,deleteQuestion } = require('../controllers/adminController/adminQuestionController')   
const { createAds,getAllAds,deleteAd } = require('../controllers/adminController/adsController') 
const { getReportedPost,getSingleReportedPost,deleteReportPost } = require('../controllers/adminController/adminPostController')
const { getAllPosts,getAllQuestions,getAdsLength } = require('../controllers/adminController/adminDashboardControllers')
const verifyAdminToken = require('../middleware/adminAuthJwt')
const adminrouter = express.Router()


adminrouter.post('/adminLogin',adminLogin)
adminrouter.get('/userdetails',verifyAdminToken,getUserDetails)
adminrouter.put('/block-user/:id',blockUser)
adminrouter.put('/unblock-user/:id',unBlockUser)
adminrouter.get('/getreportQuestion',verifyAdminToken,getReportQuestion)
adminrouter.get('/getReportQuestionDetails/:row',getReportQuestionDetails)
adminrouter.delete('/question-delete/:qid',deleteQuestion)
adminrouter.post('/createads',createAds)
adminrouter.get('/adsdetails',verifyAdminToken,getAllAds)
adminrouter.delete('/adsdelete/:id',deleteAd)
adminrouter.get('/getreportpost',verifyAdminToken,getReportedPost)
adminrouter.get('/singlereportedpost/:id',getSingleReportedPost)
adminrouter.delete('/post-delete/:id',deleteReportPost)
adminrouter.get('/getallposts',verifyAdminToken,getAllPosts)
adminrouter.get('/getallquestion',verifyAdminToken,getAllQuestions)
adminrouter.get('/getallads',verifyAdminToken,getAdsLength)
module.exports = adminrouter;