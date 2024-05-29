const mongoose=require("mongoose");
const Schema=mongoose.Schema;
// this is the schema for the login and registration 
const UserSchema=new Schema({
    name:String,
    email:{ type: String,unique:true},
    password:String,
   
});
// this is the model 
const User2=mongoose.model("User",UserSchema);

//// this   is the schema for the   the post end point 
const post = new Schema({
    Title: String,
    Body:String,
    Createdby: String,
    Active: Boolean,
    Latitude: Number,
    Longitude: Number,
});

const User8 = mongoose.model('Post', post);
// this is the end point for the location to fetch the data 
const detail = new Schema({
    Latitude: Number,
    Longitude: Number,
});

const User9 = mongoose.model('Posts', detail,'posts');

module.exports={User2,User8,User9};