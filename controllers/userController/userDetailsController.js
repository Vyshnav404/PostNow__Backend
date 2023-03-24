const { User }  = require('../../models/user')

const getUser = async(req,res)=>{
    try {
      let mail = req.params.email
      console.log("njaaaan",mail);
        User.findOne({email:mail}).then((response)=>{
          res.status(200).json(response)
        })
    } catch (error) {
        console.log(error);
    }
}

const getUserDetails = async(req,res)=>{
    try {
      let id = req.params.data_id
      await  User.findOne({_id:id}).then((response)=>{
        
        res.status(200).json(response)
      })
    } catch (error) {
       console.log(error); 
    }
}

const updateUserDetails = async(req,res)=>{
  try {
    const id = req.body._id;
    await User.findByIdAndUpdate({_id:id},{$set:{
      firstName:req.body.firstName,
      lastName:req.body.lastName,          
      email:req.body.email,
      job:req.body.job,
      company:req.body.company
    }},{upsert:true}).then((response)=>{
      res.status(200).json({response:response,message:"user updated successfully"})
    })
  } catch (error) {
    console.log(error);
  }
}


const profilePicture = async(req,res)=>{
  try {
    let id = req.params.id
    console.log(req.body);
    let imageUrl = req.body.url

    await User.findByIdAndUpdate({_id:id},{$set:{
      imageUrl
    }}).then((response)=>{
      res.status(200).json(response)
    })
  } catch (error) {
    console.log(error);  
  }
}

const getFullUsers = async(req,res)=>{
  try {
    await User.find().then((response)=>{
      res.status(200).json(response)
    })
  } catch (error) {
    console.log(error);
  }
}

const getDetailsToRedux = async(req,res)=>{
  try {
    let mail = req.params.mail
    await User.find({email:mail}).then((response)=>{
      res.status(200).json(response)
    })
  } catch (error) {
    console.log(error);
  }
}



module.exports = {
    getUser,
    getUserDetails,
    updateUserDetails,
    profilePicture,
    getFullUsers,
    getDetailsToRedux
}