const jwt = require('jsonwebtoken')


const verifyToken =(req,res,next)=>{
    console.log("i entered ");  
    const authHeader = req.headers.authorization;
    jwt.verify(authHeader,process.env.JWTPRIVATEKEY,(err,decoded)=>{
        if(err) return res.status(403).json({
            message:"Access Token is Not valid"
            
        })
    next();
   })
  
}

module.exports = verifyToken;