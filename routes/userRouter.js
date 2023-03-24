const express = require("express");
const {
  userSignup,
  verifyUser,
  resendotp,
} = require("../controllers/userController/signupController");
const { userLogin } = require("../controllers/userController/loginController");
const {
  addQuestion,
  getQuestionAnswer,
  getOneQuestion,
  reportQuestion,
  getQuestionsOnProfile,
  addUpvote,
  downVote,
  deleteQuestion,
  getHotQuestions
} = require("../controllers/userController/questionController");
const {
  addAnswer,
  getAllQuestion,
} = require("../controllers/userController/answerController");
const {
  getUser,
  getUserDetails,
  getFullUsers,
  updateUserDetails,
  profilePicture,
  getDetailsToRedux
} = require("../controllers/userController/userDetailsController");

const verifyToken = require("../middleware/authjwt");

const {
  addPost,
  getAllPosts,
  reportPost,
  editPost,
  addDisLike,
  deletePost,
  getPostOnProfile,
  getImage,
  addLike,
  addComment,
  getComment,
  getPostByCategory
} = require("../controllers/userController/userPostController");
const {
  otherDetails,
} = require("../controllers/userController/othersDetailsController");
const { getFriend } = require("../controllers/userController/friendController");
const { getAdsData } = require('../controllers/userController/userAdController')
const { followUser,unFollowUser } = require('../controllers/userController/followUnfollowController')

const router = express.Router();

//login and signup section
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/otpVerify", verifyUser);
router.post("/resendotp/:mail", resendotp);

//Question section
router.get("/onequestion/:qid", verifyToken, getOneQuestion);
router.post("/questions", verifyToken, addQuestion);
router.post("/reportQuestion/:qid", verifyToken, reportQuestion);
router.get("/Allquestions", verifyToken, getQuestionAnswer);
router.put("/upvote/:id", verifyToken, addUpvote);
router.put("/downvote/:id", verifyToken, downVote);
router.delete('/deletequestion/:id',verifyToken,deleteQuestion)

//answer section
router.post("/answers", verifyToken, addAnswer);
router.get("/getAnswers/:qid", getAllQuestion);

//profile section
router.get("/getUser/:email", verifyToken, getUser);
router.get("/getUserDetails/:data_id", verifyToken, getUserDetails);
router.put("/update-user", verifyToken, updateUserDetails);
router.put("/profilePicture/:id", verifyToken, profilePicture);
router.get("/postOnProfile/:id", verifyToken, getPostOnProfile);
router.get("/questionOnProfile/:id", verifyToken, getQuestionsOnProfile);

//post section
router.post("/addPost", verifyToken, addPost);
router.get("/getAllPosts", verifyToken, getAllPosts);
router.put("/reportPost/:id", verifyToken, reportPost);
router.delete("/deletePost/:id",verifyToken, deletePost);
router.get("/getImgToEdit/:postId",verifyToken, getImage);
router.put("/editPost/:postId", editPost);
router.put("/addLike/:id", addLike);
router.put("/disLike/:id", addDisLike);
router.get('/postbycategory/:value',getPostByCategory)
//comment section
router.put("/addcomment/:id", addComment);
router.get("/getcomments/:id", getComment);

//others profile section
router.get("/getOthersDetail/:id",verifyToken, otherDetails);

//get friend
router.get("/getfriend/:friendId", verifyToken, getFriend);

//get all users
router.get("/takealluser", verifyToken, getFullUsers);

//get ads in userside
router.get('/getcarousaldata',verifyToken,getAdsData)

//get userDetails to redux
router.get('/usertoredux/:mail',verifyToken,getDetailsToRedux)

//get hot questions on right side
router.get('/get-hot-questions',verifyToken,getHotQuestions)

//user follow and unfollow 
router.put('/follow/:id',followUser)
router.put('/unfollow/:id',unFollowUser)


module.exports = router;
