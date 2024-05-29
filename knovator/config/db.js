const e = require("cors");
const mongoose=require("mongoose");
//url
const {MONODBB_URI} = require("./../env") ;
const connectToDB =async()=>{
    try {
        await mongoose.connect(MONODBB_URI,);
        console.log("DB Connected");
    } catch (error) {
        console.log(error);
    }
};

connectToDB();