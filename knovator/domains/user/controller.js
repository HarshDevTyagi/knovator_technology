const User=require("./model");
const { hashdata,verifyHashedData } =require("./../../util/hashData");
const createToken=require("./../../util/createToken");

const authenticateUser=async(data)=>{
    try {
        const {email,password}=data;

        const fetchedUser=await User.User2.findOne({
            email
        });

        if(!fetchedUser)
        {
            throw Error("Invalid email entered");
        }

        const hashedPassword= fetchedUser.password;

        const passwordMatch=await verifyHashedData
        (password,hashedPassword);

        if(!passwordMatch)
        {
            throw Error("Invalid password entered");
        }

        //create user token 

        const tokenData={userId:fetchedUser._id,
        email};

        const token=await createToken(tokenData);

         //assign user token 

         fetchedUser.token=token;
         return fetchedUser;


    } catch (error) {
        res.status(400) .json({
            status:0,
            msg:error.message,
            rescode:400

                }); 
    }
};
const createNewUser = async (data) => {
    try {
        const { name, email, password } = data;
        console.log(name, email, password);
        const existingUser = await User.User2.findOne({ email });

        if (existingUser) {
            throw new Error("User with the provided email already exists");
        }
        console.log(name, email, password);
        const hashedPassword = await hashdata(password);
        const newUser = new User.User2({ name, email, password: hashedPassword });
        const createdUser = await newUser.save();
        return createdUser;
    } catch (error) {
        throw error;
    }
};
module.exports={createNewUser,authenticateUser}
