const express= require("express")
const router = express.Router();
const controller=require("./controller");
const auth=require("./../../middleware/auth");
const { User8, User9 } = require("./model");

// This is the end point of login where user want to  user enter there  email amd the password when email and password is correct
// it return the document of the of the where email and password is match 
router.post("/login",async(req,res)=>{
    try {
        let {email,password}=req.body;
        email=email.trim();
        password=password.trim();
        if(!(email && password))
        {
            throw Error("Empty credentials supplied");
        }

        const authenticateUser = await controller.authenticateUser({email,password});
       
         res.status(200).json({
            status:1,
            msg:authenticateUser,
            rescode:200});
        
    } catch (error) {
        res.status(400).json({
            status:0,
            msg:error.message,
            rescode:400});
        
    }
});
// this is the  registration  end point where user and name and password then it return status 200 then it store in to collection name users 
router.post("/registration",async(req,res)=>{
    try {
        let{name,email,password}=req.body;
        name=name.trim();
        email=email.trim();
        password=password.trim();
        console.log(req.body);
        

        if(!(name && email && password))
        {
            throw Error("Empty input fields!");
        } 
        else if(!/^[a-zA-Z]*$/.test(name))
        {
            throw Error("Invalid name entered");
        }
        else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
        {
         throw Error("Invalid email entered");
        }
        else if(password.length<8)
        {
            throw Error("Password is too short!. Password length must be greater than or equal to 8");
        }
        else
        {
          const newUser=await controller.createNewUser({
            name,
            email,
            password,
          });
          res.status(200).json({
            status:1,
            msg:newUser,
            rescode:200});
        
        }

    } catch (error) {
        res.status(400).json({
            status:0,
            msg:error.message,
            rescode:400});
        

        
    }
});
// this is the post end point  where user want to enter the detail 
router.post("/post", async (req, res) => {
    try {
        const {  Title, Body,Createdby, Active,Latitude,Longitude} = req.body;

        const newUser = new User8({
            Title, Body,Createdby, Active,Latitude,Longitude
        });

        const createdUser = await newUser.save();

        res.status(200).json({
            status:200,
            PostData: createdUser,
            data: "Done"
        });
    } catch (error) {
        res.status(400).json({
            status: 0,
            msg: error.message
        });
    }
});
// this s the fetch the document user have to give id of the document 
router.post("/fetchData", async (req, res) => {
    try {

        const { id} = req.body;
        const post = await User8.find({_id:id});

        res.status(200).json({
            status:200,
            PostData:post,
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// this is the updated end point in which user want to update any thing just give with the id of the document 
router.post("/updated", async (req, res) => {
    try {
        const updated =  {
            "id": req.body.id,
            "Title": req.body.Title,
            "Body": req.body.Body,
            "Createdby":req.body.Createdby,
            "Active":req.body.Active,
            "Latitude": req.body.Latitude,
            "Longitude":req.body.Longitude
        };
        
        var update = {}; 
        var query=query = { _id: updated.id };
        if(updated.Title!=undefined){
            update.Title = updated.Title ; 
            }
        if(updated.Body!=undefined)
        {  
           update.Body =  updated.Body ; 

          }
          if(updated.Createdby!=undefined)
          {  
            update.Createdby =  updated.Createdby
          }
          
            if(updated.Active!=undefined)
          {  
            update.Active =  updated.Active
    }
            if(updated.Latitude!=undefined)
          {  
          update.Latitude= updated.Latitude;
          }
            if(updated.Longitude!=undefined)
            { 
               update.Longitude = updated.Longitude
              }
              // const update = { Activity_name: updated.Activity_name }; 

        const result = await User8.findOneAndUpdate(query, update, { new: true });

        if (result) {
            res.status(200).json({
                status:200,
                PostData: result,
               
            });
        } else {
            res.status(404).json({
                status: 404,
                PostData: "No post found",
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 400,
            PostData: error.message,
            e:"errorMonitor",
        });
    }
});
// this is the delete post end point in this user give to id to delete the document 
router.post("/Deletepost", async (req, res) => {
    try {

        const { id} = req.body;
        const deletedPost = await User8.findByIdAndDelete(id);
 
        if(deletedPost!=null)
    {
        res.status(200).json({
            status:200,
            PostData:"Deleted complete",
        });
                        }
       else{
                res.status(200).json({
                status:200,
                PostData:"Deleted  not complete",
            });
            }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// this is the fetch the document by coordinates  and in result it return the document 
router.post('/fetchByCoordinates', async (req, res) => {
    try {
        const { latitude, longitude } = req.body;
        console.log(JSON.stringify(latitude));
        console.log(latitude,longitude);

        // Validate that both latitude and longitude are provided
        if (latitude === undefined || longitude === undefined) {
            return res.status(400).json({
                status: 400,
                PostData: 'Both latitude and longitude are required'
            });
        }

        // Find the document where latitude and longitude match
        const documents = await User9.find({ 
            Latitude: latitude, 
            Longitude: longitude 
        });

        if (documents.length === 0) {
            return res.status(404).json({
                status: 404,
                PostData: 'No documents found with the provided coordinates'
            });
        }

        res.status(200).json({
            status: 200,
            PostData: documents
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//this is the end point in which it count the active user and in active user
router.post('/countByActiveStatus', async (req, res) => {
    try {
        const counts = await User9.aggregate([
            {
                $group: {
                    _id: "$Active",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Initialize counts
        let activeCount = 0;
        let inactiveCount = 0;

        // Assign counts based on the aggregation result
        counts.forEach(item => {
            if (item._id === true) {
                activeCount = item.count;
            } else if (item._id === false) {
                inactiveCount = item.count;
            }
        });

        res.status(200).json({
            activeCount: activeCount,
            inactiveCount: inactiveCount
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports=router;