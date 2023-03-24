const jwt = require('jsonwebtoken')

const verifyAdminToken = (req,res,next)=>{
    const authHeader = req.headers.authorization
    console.log("inside the auth",authHeader);
    jwt.verify(authHeader,process.env.JWTADMINPRIVATEKEY,(err,decoded)=>{
        if(err) return res.status(403).json({
            message:'Access Token is not valid'
        })
        next();
    })
}

module.exports = verifyAdminToken