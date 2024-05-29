const jwt=require("jsonwebtoken");

const {Token_key}=process.env;

const verifyToken=async(req,res,next)=>{
    const token=req.body.token||req.query.token||req.headers["x-access-token"];

    //checking for provided token 
    if(!token)
    {
        return res.status(403).json({
            status:0,
            msg:"An authentication token is required",
            rescode:403});

    }
    // verify token 

    try {
        const decodedToken=await jwt.verify(token,Token_key);

        req.currentUser=decodedToken;
        
    } catch (error) {
         return res.status(401).json({
            status:0,
            msg:"Invalid Token provided",
            rescode:401});
        

        
    }

    //proceed with request 
    return next();

};
module.exports=verifyToken;