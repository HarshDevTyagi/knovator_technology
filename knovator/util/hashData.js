const bcrypt=require("bcrypt");
const e = require("cors");

//const bcrypt = require('bcrypt');

const hashdata = async (data, saltRounds = 10) => {
    try {
        const hashedData = await bcrypt.hash(data, saltRounds);
        return hashedData;
    } catch (error) {
        throw error;
    }
};


const verifyHashedData=async(unhashed,hashed)=>{
    try {
        const match =await bcrypt.compare(unhashed,hashed);

        return match;
        
    } catch (error) {
        res.status(400) .json({
            status:0,
            msg:error.message,
            rescode:400

                }); 
    }
}
module.exports={hashdata,verifyHashedData};
