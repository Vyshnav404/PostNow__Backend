const {User} = require('../../models/user');
const joi = require('joi');
const bcrypt = require('bcrypt');



const userLogin = async(req,res)=>{
    try {
        const {error} = validate(req.body);
        if(error)
        return res.status(400).send({message:error.details[0].message});
        
        const user = await User.findOne({email:req.body.email,verified:1,isBlocked:false});
     
        if(!user)
        return res.status(401).send({message:"Invalid Email or Password"});
        
        const validPassword = await bcrypt.compare(
            req.body.password,user.password
            );
            
            if(!validPassword)
            return res.status(401).send({message:"Invalid Email or Password"})
            
            const token = user.generateAuthToken();
            console.log("goooo",token); 
           
           res.status(200).send({data:token,user,message:"Logged in successfully"}) 
        
    } catch (error) {
        res.status(500).send({message:"Internal Server Error "})
        console.log(error,"kkkk"); 
        
    }
}

const validate = (data)=>{
    const schema = joi.object({
        email:joi.string().email().required().label("Email"),
        password:joi.string().required().label("Password")
    });
    return schema.validate(data);
}

module.exports = {
    userLogin 
}