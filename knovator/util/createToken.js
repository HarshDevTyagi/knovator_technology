const jwt=require("jsonwebtoken");

const{TOKEN_KEY,TOKEN_EXPIRY}= require("./../env");

const createToken=async(
    tokenData,
    tokenKey=TOKEN_KEY,
    expiresIn=TOKEN_EXPIRY
)=>{
    try {
       const token=await jwt.sign(tokenData,
        tokenKey,{
            expiresIn,
        }); 
        return token;
    } catch (error) {
        res.status(400) .json({
            status:0,
            msg:error.message,
            rescode:400

                }); 
    }
};
module.exports=createToken;