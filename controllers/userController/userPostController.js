const postDb = require("../../models/post");

const addPost = async (req, res) => {
  try {
    console.log("poseted",req.body);
    await postDb
      .create({
        postUrl: req.body.postUrl,
        caption: req.body.caption,
        user: req.body.user,
        category:req.body.category
      })
      .then((response) => {
        res.status(200).json(response);
      });
  } catch (error) {
    console.log(error);
  }
};

const getAllPosts = async (req, res) => {
  try {
    await postDb.find({}).then((response) => {
      res.status(200).json(response);
    });
  } catch (error) {
    console.log(error);
  }
};

const reportPost = async (req, res) => {
  try {
    let id = req.params.id;
    let reason = req.body.reason
    await postDb.findByIdAndUpdate(
       id ,{$push:{reason:reason},
      $set:{report:true}}
      ).then((response)=>{
      
    })
  } catch (error) {
    console.log(error);
  }
};

const getPostOnProfile = async (req, res) => {
  try {
    let userId = req.params.id;
    await postDb.find({ "user._id": userId }).then((response) => {
      res.status(200).json(response);
    });
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  try {
    let id = req.params.id;
    await postDb.findByIdAndDelete(id).then((response) => {
      res.status(200).json(response);
    });
  } catch (error) {
    console.log(error);
  }
};

const getImage = async (req, res) => {
  try {
    let postId = req.params.postId;
    await postDb.findById(postId).then((response) => {
      res.status(200).json(response);
    });
  } catch (error) {
    console.log(error);
  }
};

const editPost = async (req, res) => {
  try {
    let postId = req.params.postId;  
    await postDb
      .findByIdAndUpdate(postId, {
        $set: {
          postUrl: req.body.postUrl,
          caption: req.body.caption,
        },
      })
      .then((response) => {
        res.status(200).json(response);
      });
  } catch (error) {
    console.log(error);
  }
};

const addLike = async (req, res) => {
  try {
    let postId = req.params.id;
    let id = req.body.userId;

    await postDb.updateOne({_id:postId},{ $pull: { dislike: id } });
    let valid = await postDb.findOne({_id:postId,like:id})
    if(valid){
      res.status(400)
    }else{
      await postDb.findByIdAndUpdate(postId, { $push: { like: id } }).then((response)=>{
        res.status(200).json(response)
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const addDisLike = async (req, res) => {
  try {
    let postId = req.params.id;
    let id = req.body.userId;

    await postDb.updateOne({_id:postId},{ $pull: { like: id } });
    let value = await postDb.findOne({_id:postId,dislike:id})
    if(value){
      res.status(400)
    }else{
     await postDb.findByIdAndUpdate(postId, { $push: { dislike: id } }).then((response)=>{
        res.status(200).json(response)
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const addComment = async(req,res)=>{
  try {
    let postId = req.params.id;
    await postDb.findByIdAndUpdate(postId,{$push:{
      comment:{text:req.body.comment,userId:req.body.userId}
    }}).then((response)=>{
      res.status(200).json(response)
    })
  } catch (error) {
    console.log(error);
  }
}


const getComment = async(req,res) =>{
  try {
    let id = req.params.id
    await postDb.findById(id).populate('comment.userId').then((response)=>{
      res.status(200).json(response)
    })
  } catch (error) {
    console.log(error);
  }
}

const getPostByCategory = async(req,res)=>{
  try {
    let value = req.params.value
    console.log("values========================>",value);
    await postDb.find({category:value}).then((response)=>{
      res.status(200).json(response)
    })
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addPost,
  getAllPosts,
  reportPost,
  getPostOnProfile,
  deletePost,
  getImage,
  editPost,
  addLike,
  addDisLike,
  addComment,
  getComment,
  getPostByCategory
};
