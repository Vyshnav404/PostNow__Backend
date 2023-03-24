const {Admin}=require('../../models/admin');
const joi = require('joi');
const bcrypt = require('bcrypt')


const adminLogin = async(req,res)=>{
    
    try {
        const {error} = validate(req.body);
        if(error)
        return res.status(400).send({message:error.details[0].message});

        const admin = await Admin.findOne({userName:req.body.userName});

        if(!admin)
        return res.status(401).send({message:'Invalid Email or Password'});

        const validPassword = await bcrypt.compare(
            req.body.password,admin.password
        );

        if(!validPassword)
        return res.status(401).send({message:"Invalid Email or Password"})

        const token = admin.generateAuthToken();

        res.status(200).send({data:token,message:"Logged in successfull"})

    } catch (error) {
        console.log("error",error);
        res.status(500).send({message:'Internal Server Error'})
    }
}


const validate = (data)=>{
    const schema = joi.object({
        userName:joi.string().required().label('Username'),
        password:joi.string().required().label('Password')
    });
    return schema.validate(data);
}

module.exports={
    adminLogin
}