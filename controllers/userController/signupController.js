const{User,validate} = require('../../models/user')
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer");



let mailTransporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"vyshnav404@gmail.com",
        pass:"cfurmqbfeuxzcwwz"
    },
});
let OTP = `${Math.floor(1000 + Math.random() * 9000)}`;



const userSignup = async(req,res)=>{
    try {

        let Email = req.body.email;
        console.log("email check ",Email)
        let mailDetails = {
            from :"vyshnav404@gmail.com",
            to:Email,
            subject:"PostNow",
            html:`<p> YOUR OTP FOR REGISTRATION IN PostNow IS ${OTP}</P>`,
        };
        mailTransporter.sendMail(mailDetails,function(err,data){
            if(err){
                console.log("error occurs ",err);
            }else{
                console.log("email send successfully");
            }
        });


        const {error} = validate(req.body);
        if(error) return res.status(400).send({message:error.details[0].message});
        
        const user = await User.findOne({email:req.body.email});
        console.log("going");
        if(user)
        return res.status(409).send({message:"User with given email already exists!!!"});

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password,salt);

        await new User({...req.body, password:hashPassword}).save();
        console.log(req.body,"bodyy vanne");
        res.status(201).send({message:"User created successfully",...req.body,OTP})

    } catch (error) {
        res.status(500).send({message:"Internal Server Error"})
        console.log(error);

    }
}

const verifyUser = async(req,res)=>{
    try {
       let mail = req.body.mail
        await User.findOneAndUpdate({email:mail},{$set:{
            verified:1
        }})
    } catch (error) {
        console.log(error);
    }
}

const resendotp = async(req,res)=>{
    let Email = req.params.mail
     try {
        // let Email = req.body.email;
        console.log("email check ",Email)
        let mailDetails = {
            from :"vyshnav404@gmail.com",
            to:Email,
            subject:"PostNow",
            html:`<p> YOUR OTP FOR REGISTRATION IN PostNow IS ${OTP}</P>`,
        };
        mailTransporter.sendMail(mailDetails,function(err,data){
            if(err){
                console.log("error occurs ",err);
            }else{
                res.status(200).json({OTP})
                console.log("email send successfully");
            }
        });
     } catch (error) {
        console.log(error);
     }
}

module.exports = {
    userSignup,
    verifyUser,
    resendotp
}